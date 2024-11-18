import spinImage from "./images/spin.png";
import "./slotPanel.css";

const greaterThan = ">";
const lessThan = "<";

export default function SlotPanel({
  handleAutoSpinButton,
  handleMaxButton,
  isPressed,
  handleSpinButton,
  bet,
  handleLessButton,
  handleMoreButton,
  balance,
  handleKeyPress,
  isSpinning,
}) {
  return (
    <div
      className="slot-panel"
      onKeyDown={(e) => handleKeyPress(e)}
      tabIndex="0"
    >
      <div className="auto-spin-class">
        <button className="auto-spin-button" onClick={handleAutoSpinButton}>
          {isSpinning ? "Stop-spinning" : "Auto-Spin"}
        </button>
      </div>
      <dic className="max-bet-class">
        <button className="max-bet-button" onClick={handleMaxButton}>
          MaxBet
        </button>
      </dic>
      <div className="spin-button-class">
        <button
          className="spin-button"
          disabled={isPressed}
          onClick={handleSpinButton}
        >
          <img src={spinImage} className="spin-image"></img>
        </button>
      </div>
      <div className="bet-class">
        <p className="bet-amount">Bet: {bet}$</p>
        <div className="bet-buttons">
          <button className="less-than" onClick={handleLessButton}>
            {lessThan}
          </button>
          <button className="more-than" onClick={handleMoreButton}>
            {greaterThan}
          </button>
        </div>
      </div>
      <div className="balance-class">
        <p>Your balance</p>
        <span className="cash-class">{balance}$</span>
      </div>
    </div>
  );
}
