
import { useAxios } from "app/Hooks";
import { endpoints } from "static";
import TagForm from "./Form";
import { Toast } from "app/shared";
import { EditProps, SubmitProps } from "./Types";

const { TAGS } = endpoints;

const EditTags = ({ current, bool, toggle, loading, setTrue, setFalse, refetch }: EditProps) => {
    const { callAxios } = useAxios()

    const onSubmit = (values: SubmitProps) => {
        setTrue();
        callAxios({
            method: "put",
            data: values,
            url: `${TAGS}/${current.id}`,
        }).then((res) => {
            if (res) {
                setFalse();
                toggle();
                refetch();
                Toast({ message: res.message, type: "success" });
            }
        });

    }
    return (
        <TagForm
            bool={bool}
            toggle={toggle}
            loading={loading}
            current={current}
            onSubmit={onSubmit}
        />
    );
};

export default EditTags;