import React from "react";

const InvalidCard = ({ certificate }) => {
  return (
    <div className="w-full max-w-3xl bg-surface-container-lowest rounded-xl border border-error/30 shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
      {/* Invalid Header */}
      <div className="bg-error/10 px-lg py-xl flex flex-col items-center text-center border-b border-error/20">
        <div className="w-20 h-20 bg-error rounded-full flex items-center justify-center mb-md shadow-lg shadow-error/20">
          <span
            className="material-symbols-outlined text-on-error text-5xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            cancel
          </span>
        </div>

        <h1 className="font-headline-lg text-headline-lg text-error mb-2">
          INVALID
        </h1>

        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[28rem] mx-auto">
          Certificate verification failed. This certificate may have been
          altered or is not registered on the blockchain.
        </p>
      </div>

      {/* Warning Banner */}
      <div className="p-lg">
        <div className="bg-error/10 border border-error/20 rounded-lg p-md flex gap-3">
          <span className="material-symbols-outlined text-error">warning</span>

          <div>
            <p className="font-medium text-error">Verification Failed</p>

            <p className="text-sm text-on-surface-variant">
              The certificate hash does not match any valid record stored on the
              blockchain.
            </p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="px-lg pb-lg">
        <div className="bg-surface-container-low p-lg rounded-xl border border-outline-variant">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-error">
                  description
                </span>

                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Certificate Name
                </span>
              </div>

              <div className="bg-surface-container-lowest p-3 rounded border border-outline-variant">
                {certificate?.name_file || "Unknown Certificate"}
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-error">
                  fingerprint
                </span>

                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Submitted Hash
                </span>
              </div>

              <div className="bg-surface-container-lowest p-3 rounded font-mono text-sm border border-outline-variant break-all">
                {certificate?.hash}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-error">
                  error
                </span>

                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Status
                </span>
              </div>

              <div className="px-1">
                <span className="font-medium text-error">
                  Verification Failed
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-error">
                  schedule
                </span>

                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Verification Time
                </span>
              </div>

              <div className="px-1">
                <span className="text-on-surface">
                  {new Date().toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-surface-container px-lg py-md border-t border-outline-variant">
        <div className="flex items-center gap-2 text-error">
          <span className="material-symbols-outlined">report</span>

          <span className="font-medium">
            This certificate cannot be verified and should not be considered
            authentic.
          </span>
        </div>
      </div>
    </div>
  );
};

export default InvalidCard;
