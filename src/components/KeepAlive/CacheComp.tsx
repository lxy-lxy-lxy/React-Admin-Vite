import { FC, Fragment, PropsWithChildren, useRef, Suspense } from "react";

interface Props {
  active: boolean;
  cache: boolean;
}

const Wrapper: FC<PropsWithChildren & { active: boolean }> = ({
  children,
  active,
}) => {
  const resolveRef = useRef<(value: unknown) => void>();

  if (active) {
    if (resolveRef.current) {
      resolveRef.current("");
      resolveRef.current = undefined;
    }
  } else {
    throw new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  }

  return children;
};

const CacheComp: FC<Props & PropsWithChildren> = ({ active, children }) => {
  return (
    <Fragment>
      <Suspense fallback={null}>
        <Wrapper active={active}>{children}</Wrapper>
      </Suspense>
    </Fragment>
  );
};

export default CacheComp;
