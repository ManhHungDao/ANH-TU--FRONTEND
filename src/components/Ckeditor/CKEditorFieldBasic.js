import React, { useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Editor } from "ckeditor5-custom-build/build/ckeditor";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import "./ckeditor.scss";

const CKEditorFieldBasic = ({
  value,
  onChange,
  isError,
  errorText,
  minWidth,
}) => {
  const editorRef = useRef(null); // Ref để giữ CKEditor instance

  const defaultConfig = {
    toolbar: {
      items: [
        "heading",
        "|",
        "fontSize",
        "fontFamily",
        "|",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "alignment",
        "|",
        "insertTable",
        "link",
        "|",
        "numberedList",
        "bulletedList",
        "|",
        "outdent",
        "indent",
        "|",
        "todoList",
        "blockQuote",
        "codeBlock",
        "|",
        "removeFormat",
        "undo",
        "redo",
        "|",
        "code",
        "findAndReplace",
        "highlight",
        "horizontalLine",
        "pageBreak",
        "specialCharacters",
        "restrictedEditingException",
        "subscript",
        "superscript",
        "sourceEditing",
      ],
      shouldNotGroupWhenFull: true,
    },
    language: "vi",
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableProperties",
        "tableCellProperties",
        "toggleTableCaption",
      ],
    },
    fontSize: {
      options: [9, 11, 13, "default", 17, 19, 21],
      supportAllValues: true,
    },
    fontColor: {
      columns: 6,
      documentColors: 12,
    },
    fontBackgroundColor: {
      documentColors: 0,
    },
    mention: {
      feeds: [
        {
          marker: "@",
          feed: ["@apple", "@cake", "@donut", "@gummi"],
          minimumCharacters: 1,
        },
      ],
    },
    htmlEmbed: {
      showPreviews: true,
    },
    updateSourceElementOnDestroy: true,
    allowedContent: true,
  };

  const API_URl = "https://noteyard-backend.herokuapp.com";
  const UPLOAD_ENDPOINT = "api/blogs/uploadImg";

  function uploadAdapter(loader) {
    return {
      upload: () =>
        new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("uploadImg", file);
            fetch(`${API_URl}/${UPLOAD_ENDPOINT}`, {
              method: "post",
              body: body,
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({ default: `${API_URl}/${res.url}` });
              })
              .catch(reject);
          });
        }),
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) =>
      uploadAdapter(loader);
  }

  // 👉 Theo dõi thay đổi `value` và cập nhật editor nếu khác nhau
  useEffect(() => {
    if (editorRef.current && editorRef.current.getData() !== value) {
      editorRef.current.setData(value || "");
    }
  }, [value]);

  return (
    <FormControl
      error={isError}
      sx={{ minWidth: minWidth ? minWidth : "100%" }}
    >
      <div
        className={`ckeditor-basic ${isError ? "ckeditor-basic--error" : ""}`}
      >
        <CKEditor
          editor={Editor}
          data={value}
          config={defaultConfig}
          onReady={(editor) => {
            editorRef.current = editor; // 👈 gán ref
            editor.ui
              .getEditableElement()
              .parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editor.ui.getEditableElement()
              );
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      </div>
      {isError && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
};

export default CKEditorFieldBasic;
