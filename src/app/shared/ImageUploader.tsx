/** @format */

import { Avatar, Image } from "antd";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Icons } from "app/shared";

const { AiOutlineUpload } = Icons;

const UploadImage = ({ setLogo }: any) => {
  const logo = setLogo.getFieldValue("img_logo");
  const onDrop = useCallback(
    (files) => {
      const file = files[0];
      setLogo.setFieldsValue({ logo: file });
      setLogo.setFieldsValue({ img_logo: URL.createObjectURL(file) });
    },
    [setLogo]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    accept: "image/*",
    // maxSize,
    // multiple,
    maxSize: 5 * 1000 * 1000,
    onDrop,
  });
  return (
    <div {...getRootProps({ className: "grid_class" })}>
      <input {...getInputProps()} />
      {!logo ? (
        <div onClick={open}>
          <Avatar
            style={{ cursor: "pointer" }}
            size={100}
            icon={<AiOutlineUpload />}
            className="hover_avatar"
          />
        </div>
      ) : (
        <div className="upload-wrapper" onClick={open}>
          <Image
            src={logo}
            width={100}
            height={100}
            alt="logo here"
            className="img_logo"
            preview={false}
          />
          {/* <CloseOutlined /> */}
        </div>
      )}
    </div>
  );
};

export default UploadImage;
