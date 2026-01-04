import KioskShell from "../kiosk/KioskShell.js";
import NavBar from "./NavBar.js";
import ScreenContainer from "./ScreenContainer.js";
import { useAppMode } from "../../context/AppModeContext.js";

const ModeShell = ({ children, onReset }) => {
  const { mode } = useAppMode();

  if (mode === "kiosk") {
    return (
      <ScreenContainer scroll={false}>
        <KioskShell onReset={onReset}>
          <NavBar />
          {children}
        </KioskShell>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <NavBar />
      {children}
    </ScreenContainer>
  );
};

export default ModeShell;
