import React from "react";

export const BannerModal = ({banner}) => {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-body">
            `
            <iframe
              className="bannerPlayer"
              id="ytplayer"
              type="text/html"
              width="760"
              height="550"
              src={`https://www.youtube.com/embed/${banner[0].trailerId}?&origin=http://example.com`}
              frameBorder="0"
              allowFullScreen
            />{" "}
            `
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
