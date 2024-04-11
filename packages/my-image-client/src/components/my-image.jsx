import { forwardRef } from "react";

export default forwardRef(function MyImage(props, ref) {
  const {
    src,
    width,
    height,
    alt,
    loader,
    fill,
    sizes,
    quality,
    priority,
    placeholder,
    style,
    onLoadingComplete,
    onLoad,
    onError,
    loading,
    blurDataURL,
  } = props;

  return <img ref={ref} src={src} alt={alt} />;
});
