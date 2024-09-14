import React, { useRef } from "react";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { FiLoader } from "react-icons/fi";

const Backend = import.meta.env.VITE_PUBLIC_BACKEND_URL;

const Pdf = ({ pdfs, setPdfs, folderName, setfolderName }) => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  console.log(folderName);

  function settingP() {
    setLoading(true);
    setTimeout(() => {
      if (pdfs) {
        setLoading(false);
        setUploaded(true);
        setPdfs(null);
        setfolderName(null);
      }
    }, 2000);
  }

  function renameString(inputString) {
    // Implement the conditions to modify the inputString
    if (inputString.includes("pdfText\\")) {
      inputString = inputString.replace("pdfText\\", "");
    }
    if (inputString.includes(".txt")) {
      inputString = inputString.replace(".txt", "");
    }
    if (inputString.includes("-")) {
      inputString = inputString.replace("-", "");
    }
    for (var i = 0; i < inputString.length; i++) {
      if (inputString.includes(" ")) {
        inputString = inputString.replace(" ", "");
      }
    }
    if (inputString.includes("&")) {
      inputString = inputString.replace("&", "");
    }

    return inputString;
  }

  function handlePDFUpload(event) {
    const selectedFiles = event.target.files;

    setLoading(true);

    const formData = new FormData();

    Array.from(selectedFiles).forEach((file, index) => {
      const modifiedFileName = renameString(file.name.toLowerCase()).split(
        "."
      )[0];
      formData.append("pdfs", file, modifiedFileName);
    });

    formData.append("folderName", folderName);

    fetch(Backend + "/admin_upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log("PDF files sent to the backend successfully");
          setUploaded(true);
        } else {
          console.error("Failed to send PDF files to the backend");
        }
      })
      .catch((error) => {
        console.error("Error sending PDF files to the backend", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6">
       
        {uploaded ? (
          <>
            <p className="md:text-3xl text-xl font-extrabold text-zinc-600 ">
              PDF Uploaded Successfully
            </p>
          </>
        ) : (
          <>
           <p className="md:text-3xl text-xl font-extrabold text-zinc-600 ">
          Please Upload the subject PDF
        </p>

            <input
              ref={fileInputRef}
              type="file"
              id="pdfUpload"
              accept=".pdf"
              className="hidden" // Hide the input element
              onChange={(e) => handlePDFUpload(e)}
              multiple
            />
            <button
              onClick={() => {
                fileInputRef.current.click();
              }}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin text-white text-xl font-bold" />
                </>
              ) : (
                <>
                  <FiUpload className=" text-white text-xl font-bold hover:text-2xl ease-linear duration-100" />
                </>
              )}
            </button>

            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
              onClick={settingP}
            >
              Upload
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Pdf;
