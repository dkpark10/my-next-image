import { forwardRef, useEffect, useRef } from 'react';

/** @see {@link https://github.com/vercel/next.js/blob/7ef6c4eb17b92fac2a71f52c99a23a9794438c3a/packages/next/src/client/image-component.tsx} */
export default forwardRef(function MyImage(props, ref) {
  const {
    src,
    width,
    height,
    alt,
    loader,
    fill,
    sizes,
    priority,
    placeholder,
    style,
    onLoadingComplete,
    onLoad,
    onError,
    loading,
    blurDataURL,
    layout,
    objectFit,
    objectPosition,
    lazyBoundary,
    lazyRoot,
    quality = 75,
    unoptimized = false,
  } = props;

  const onLoadRef = useRef(onLoad)
  useEffect(() => {
    onLoadRef.current = onLoad;
  }, [onLoad]);

  const isLazy = loading === 'lazy' && !priority;

  if (src.endsWith('.svg')) {
    unoptimized = true;
  }

  if (!src) {
    unoptimized = true;
  } else {
    if (typeof height === 'undefined') {
      throw new Error('height 속성 미지정');
    } else if(typeof width === 'undefined') {
      throw new Error('width 속성 미지정');
    }
  }

  if (priority && loading === 'lazy') {
    throw new Error('두개 속성은 공존 불가');
  }

  /**
   * @component <Image src="/mangom.jpg" width={100} height={100} alt="망곰 이미지" />
   */

  // getimgProps 함수를 거쳐 아래와 같은 데이터를 반환 받는다.
  // {
  //   alt: "망곰 이미지",
  //   loading: "lazy",
  //   fetchPriority: undefined,
  //   width: 100,
  //   height: 100,
  //   decoding: "async",
  //   className: undefined,
  //   style: {
  //     color: "transparent",
  //   },
  //   sizes: undefined,
  //   srcSet: "/_next/image?url=%2Fmangom.jpg&w=128&q=75 1x, /_next/image?url=%2Fmangom.jpg&w=256&q=75 2x",
  //   src: "/_next/image?url=%2Fmangom.jpg&w=256&q=75",
  // }
  // {
  //   unoptimized: false,
  //   priority: false,
  //   placeholder: "empty",
  //   fill: false,
  // }

  return (
    <img
      width={width}
      loading={loading}
      height={height}
      style={style}
      ref={ref}
      src={src}
      alt={alt}
      onLoad={(e) => {
        const imgTarget = e.currentTarget;
        onLoadRef.current({ ...e, currentTarget: imgTarget });
      }}
      onError={(e) => {
        
      }}
    />
  );
});
