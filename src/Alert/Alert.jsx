import React from "react";

function Alert() {
  return (
    <div>
      <div class="fixed bottom-0 end-0 z-[60] sm:max-w-xl w-full mx-auto p-6">
        <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div class="flex gap-x-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="72"
              height="63"
              fill="green"
              class="hidden sm:block shrink-0 w-20 bi bi-check2-square"
              viewBox="0 0 16 16"
            >
              <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z" />
              <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0" />
            </svg>

            <div class="grow">
              
              <p class="text-sm text-gray-600">
                Data Submitted Successfully
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alert;
