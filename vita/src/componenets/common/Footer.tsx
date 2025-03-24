/**
 * 컴포넌트 : 풋터 영역
 */

import ModalVerification from "../modal/ModalVerification";

export default function Footer() {
  return (<>


{/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button> */}

  {/* <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> */}

    {/* 모달 - 이메일 인증 */}
    <ModalVerification length={6} />
  
    <div className="app-footer-wrap">
      <div className="app-footer-outer">
        
        <div className="app-footer-inner">
          <footer className="app-footer" id="appfoot" role="contentinfo"> <br/> </footer>
        </div> { /* #appfoot*/ }

      </div>
    </div> { /* app-footer-wrap */ }
  </>);
};