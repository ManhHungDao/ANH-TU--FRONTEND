// CKEditorFieldBasic.jsx
import React, { useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  DecoupledEditor,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  Bookmark,
  CloudServices,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Fullscreen,
  Heading,
  Highlight,
  HorizontalLine,
  ImageBlock,
  ImageCaption,
  ImageEditing,
  ImageInline,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  ImageUtils,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  PageBreak,
  Paragraph,
  PasteFromOffice,
  PlainTableOutput,
  RemoveFormat,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableLayout,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
} from "ckeditor5";
import translations from "ckeditor5/translations/vi.js";
import "ckeditor5/ckeditor5.css";
import "./style.scss";
const LICENSE_KEY = "GPL"; // Thay bằng key thật nếu cần

const CKEditorFieldBasic = ({ value, onChange }) => {
  const editorRef = useRef();
  const toolbarRef = useRef();

  useEffect(() => {
    return () => {
      // Cleanup toolbar when unmounted
      if (toolbarRef.current) {
        while (toolbarRef.current.firstChild) {
          toolbarRef.current.removeChild(toolbarRef.current.firstChild);
        }
      }
    };
  }, []);

  return (
    <div
      className="editor-container"
      style={{ border: "1px solid #ccc", borderRadius: 4 }}
    >
      <div ref={toolbarRef}></div>
      <CKEditor
        editor={DecoupledEditor}
        data={value}
        config={{
          toolbar: {
            items: [
              "undo",
              "redo",
              "|",
              "heading",
              "|",
              "fontSize",
              "fontFamily",
              "fontColor",
              "fontBackgroundColor",
              "|",
              "bold",
              "italic",
              "underline",
              "|",
              "link",
              "insertTable",
              "insertTableLayout",
              "highlight",
              "blockQuote",
              "|",
              "alignment",
              "|",
              "bulletedList",
              "numberedList",
              "todoList",
              "outdent",
              "indent",
            ],
            shouldNotGroupWhenFull: false,
          },
          plugins: [
            Alignment,
            Autoformat,
            AutoImage,
            AutoLink,
            Autosave,
            BalloonToolbar,
            BlockQuote,
            Bold,
            Bookmark,
            CloudServices,
            Essentials,
            FindAndReplace,
            FontBackgroundColor,
            FontColor,
            FontFamily,
            FontSize,
            Fullscreen,
            Heading,
            Highlight,
            HorizontalLine,
            ImageBlock,
            ImageCaption,
            ImageEditing,
            ImageInline,
            ImageInsertViaUrl,
            ImageResize,
            ImageStyle,
            ImageTextAlternative,
            ImageToolbar,
            ImageUpload,
            ImageUtils,
            Indent,
            IndentBlock,
            Italic,
            Link,
            LinkImage,
            List,
            ListProperties,
            PageBreak,
            Paragraph,
            PasteFromOffice,
            PlainTableOutput,
            RemoveFormat,
            SpecialCharacters,
            SpecialCharactersArrows,
            SpecialCharactersCurrency,
            SpecialCharactersEssentials,
            SpecialCharactersLatin,
            SpecialCharactersMathematical,
            SpecialCharactersText,
            Strikethrough,
            Subscript,
            Superscript,
            Table,
            TableCaption,
            TableCellProperties,
            TableColumnResize,
            TableLayout,
            TableProperties,
            TableToolbar,
            TextTransformation,
            TodoList,
            Underline,
          ],
          balloonToolbar: [
            "bold",
            "italic",
            "|",
            "link",
            "|",
            "bulletedList",
            "numberedList",
          ],
          fontFamily: {
            supportAllValues: true,
          },
          fontSize: {
            options: [10, 12, 14, "default", 18, 20, 22],
            supportAllValues: true,
          },
          fullscreen: {
            onEnterCallback: (container) =>
              container.classList.add(
                "editor-container",
                "editor-container_document-editor",
                "editor-container_include-fullscreen",
                "main-container"
              ),
          },
          heading: {
            options: [
              {
                model: "paragraph",
                title: "Paragraph",
                class: "ck-heading_paragraph",
              },
              {
                model: "heading1",
                view: "h1",
                title: "Heading 1",
                class: "ck-heading_heading1",
              },
              {
                model: "heading2",
                view: "h2",
                title: "Heading 2",
                class: "ck-heading_heading2",
              },
              {
                model: "heading3",
                view: "h3",
                title: "Heading 3",
                class: "ck-heading_heading3",
              },
              {
                model: "heading4",
                view: "h4",
                title: "Heading 4",
                class: "ck-heading_heading4",
              },
              {
                model: "heading5",
                view: "h5",
                title: "Heading 5",
                class: "ck-heading_heading5",
              },
              {
                model: "heading6",
                view: "h6",
                title: "Heading 6",
                class: "ck-heading_heading6",
              },
            ],
          },
          image: {
            toolbar: [
              "toggleImageCaption",
              "imageTextAlternative",
              "|",
              "imageStyle:inline",
              "imageStyle:wrapText",
              "imageStyle:breakText",
              "|",
              "resizeImage",
            ],
          },
          language: "vi",
          licenseKey: LICENSE_KEY,
          placeholder: "Nhập nội dung bước...",
          table: {
            contentToolbar: [
              "tableColumn",
              "tableRow",
              "mergeTableCells",
              "tableProperties",
              "tableCellProperties",
            ],
          },
          translations: [translations],
        }}
        onReady={(editor) => {
          if (toolbarRef.current) {
            toolbarRef.current.appendChild(editor.ui.view.toolbar.element);
          }
          editorRef.current = editor;
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
};

export default CKEditorFieldBasic;
