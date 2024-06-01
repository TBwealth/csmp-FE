import { useState } from "react";

const RepositoryScan = () => {
  const [allRepos, setAllRepos] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="p-4 md:p-12 lg:p-36">
      {/* {allRepos.length < 1 && (
        <EmptyRepo showModal={() => setShowModal(true)} />
      )} */}
    </div>
  );
};

export default RepositoryScan;
