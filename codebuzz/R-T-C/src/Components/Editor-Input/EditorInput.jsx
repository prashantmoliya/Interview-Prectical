import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const initialState = {
    content: "",
}

const EditorInput = () => {

    const [editorContent, setEditorContent] = useState(initialState);
    console.log("EditorContent++", editorContent);

    const [savedContent, setSavedContent] = useState([]);
    console.log("Get-Content++", savedContent);


    useEffect(() => {
        const storedContent = JSON.parse(localStorage.getItem('Editor-Content-List')) || [];
        setSavedContent(storedContent);
    }, []);



    const handleEditorChange = (data) => {
        setEditorContent({
            content: data,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Submit-Content++", editorContent);

        const updatedContent = [...savedContent, editorContent];
        localStorage.setItem('Editor-Content-List', JSON.stringify(updatedContent));
        setSavedContent(updatedContent);
        setEditorContent(initialState);
    }



    const handleDelete = (index) => {
        const updatedContent = savedContent.filter((_, i) => i !== index);
        localStorage.setItem('Editor-Content-List', JSON.stringify(updatedContent));
        setSavedContent(updatedContent);
    };



    const handleDownload = (content, index) => {
        const fullHtml = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Article</title>

                <!-- Bootstrap CSS cdn -->
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <style>
                body{
                    margin: 15px 20px;
                }

                .tooltip {
                    /* margin: 5px !important; */
                }

                .tooltip-inner {
                    padding: 8px 15px;
                    font-size: 12px;
                    max-width: 250px;
                    text-align: center;
                }

                .bs-tooltip-top .tooltip-arrow {
                    margin-bottom: 5px;
                }

                .bs-tooltip-bottom .tooltip-arrow {
                    margin-top: 5px;
                }

                .bs-tooltip-start .tooltip-arrow {
                    margin-right: 5px;
                }

                .bs-tooltip-end .tooltip-arrow {
                    margin-left: 5px;
                }
            </style>
            <body>
                <div>
                    ${content}
                </div>

                <!-- Bootstrap JS cdn -->
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
                <script type="text/javascript">
                    document.addEventListener("DOMContentLoaded", function () {
                        // var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
                        // var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                        //     return new bootstrap.Tooltip(tooltipTriggerEl);
                        // });

                        var tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');

                        tooltipTriggerList.forEach(function (tooltipTriggerEl) {
                            var id = tooltipTriggerEl.getAttribute("data-tooltip-id");
                            var relatedItem = document.getElementById(id);

                            if (relatedItem) {
                                var tooltipText = relatedItem.innerText;
                                tooltipTriggerEl.setAttribute("title", tooltipText);
                            }

                            var tooltip = new bootstrap.Tooltip(tooltipTriggerEl, {
                                // offset: [0, 0],
                                trigger: "manual", // Prevents default hiding
                                html: true
                            });


                            let tooltipElement;

                            // Show tooltip on hover
                            tooltipTriggerEl.addEventListener("mouseenter", function () {
                                tooltip.show();

                                // setTimeout(() => {
                                //     tooltipElement = document.querySelector(".tooltip");

                                //     if (tooltipElement) {
                                //         tooltipElement.addEventListener("mouseenter", function () {
                                //             tooltip.show(); // Keep tooltip open when hovering over it
                                //         });

                                //         tooltipElement.addEventListener("mouseleave", function () {
                                //             tooltip.hide();
                                //         });
                                //     }
                                // }, 100);
                            });


                            // Keep tooltip open when hovering over it
                            tooltipTriggerEl.addEventListener("mouseleave", function () {
                                // tooltip.hide();
                                setTimeout(function () {
                                    if (!tooltipTriggerEl.matches(":hover") && !document.querySelector(".tooltip:hover")) {
                                        tooltip.hide();
                                    }
                                }, 0);
                            });


                            // Scroll to the section on click
                            tooltipTriggerEl.addEventListener("click", function (event) {
                                event.preventDefault(); // Preven               t default action
                                if (relatedItem) {
                                    relatedItem.scrollIntoView({ behavior: "smooth", block: "start" });
                                }
                            });
                        });
                    });
                </script>
            </body>
            </html>
        `;

        const blob = new Blob([fullHtml], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Article-${index}.html`;
        link.click();
    };


    return (
        <div className='m-5 d-sflex justify-content-center'>

            <form onSubmit={handleSubmit}>
                <Editor
                    apiKey='nflbilzqfgq8ojfo90tqugkp5ygpyhgwdt4jcwpkc9tqwnm0'
                    value={editorContent.content}
                    onEditorChange={handleEditorChange}
                    init={{
                        height: 350,
                        plugins: [
                            // Core editing features
                            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                            // Your account includes a free trial of TinyMCE premium features
                            // Try the most popular premium features until Mar 2, 2025:
                            'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'mentions', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
                        ],
                        toolbar: [
                            'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image media link | table | checklist | code'
                        ],
                        // Add advanced options
                        image_advtab: true,
                        file_picker_types: 'image,media',
                        file_picker_callback: (callback, value, meta) => {
                            // Handle file picker callback here, such as for uploading images or media
                        },
                        media_live_embeds: true,
                        a11y_advanced_options: true,
                        content_style: 'body { font-family:Arial, sans-serif; font-size:14px; }',
                    }}
                />

                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>




            <div className="mt-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            { /*
                                <th scope="col">Content</th>
                            */}
                            <th scope="col">Download</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {savedContent.map((i, index) => (
                            <tr key={index}>
                                <td>{index + 1}.</td>
                                { /*
                                    <td dangerouslySetInnerHTML={{ __html: i.content }}></td>
                                */}
                                <td>
                                    <button onClick={() => handleDownload(i.content, index + 1)} className="btn btn-success mt-3">Download HTML</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(index)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>
    );
}

export default EditorInput;
