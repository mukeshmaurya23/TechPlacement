const Shimmer = () => {
  return (
    <>
      <div className="card-list">
        {Array(10)
          .fill("")
          .map((item, index) => (
            <div className="shimmer-card" key={index}>
              <div className="shimmer-img">
                <img src="" alt="" />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Shimmer;
