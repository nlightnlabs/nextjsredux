
const imageLoader = ({ src }: { src: string }) => {
    const basePath = process.env.NODE_ENV === "production" ? '/nextjsredux' : '';
    return `${basePath}${src}`;
  };
  
  export default imageLoader;
  