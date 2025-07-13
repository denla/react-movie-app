import ContentLoader from "react-content-loader";

const CoverLoader = (props) => (
  <div className="card__cover-wrapper">
    <ContentLoader
      speed={1}
      width="100%"
      height="100%"
      backgroundColor="#7171713c"
      foregroundColor="rgba(141, 141, 141, 0.56)"
      {...props}
    >
      <rect x="0" y="0" width="100%" height="100%" />
    </ContentLoader>
  </div>
);

export default CoverLoader;
