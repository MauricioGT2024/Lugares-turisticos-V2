import { Suspense, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ChildrenWithLoad = ({ children, onLoad }) => {
  useEffect(() => {
    onLoad();
  }, [onLoad]);
  return children;
};

ChildrenWithLoad.propTypes = {
  children: PropTypes.node.isRequired,
  onLoad: PropTypes.func.isRequired,
};

const LazyLoading = ({ children, redirectPath }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && redirectPath) {
      navigate(redirectPath);
    }
  }, [isLoaded, redirectPath, navigate]);

  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading...
        </div>
      }
    >
      <ChildrenWithLoad onLoad={() => setIsLoaded(true)}>
        {children}
      </ChildrenWithLoad>
      {!isLoaded && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1000,
          }}
        />
      )}
    </Suspense>
  );
};

LazyLoading.propTypes = {
  children: PropTypes.node.isRequired,
  redirectPath: PropTypes.string,
};

export default LazyLoading;