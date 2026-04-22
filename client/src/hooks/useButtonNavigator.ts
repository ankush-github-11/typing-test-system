import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface useButtonNavigatorProps {
  targetKey: string;
  targetPath: string;
}
const useButtonNavigator = (props: useButtonNavigatorProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === props.targetKey) {
        e.preventDefault();
        navigate(props.targetPath);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate, props.targetKey, props.targetPath]);
};

export default useButtonNavigator;
