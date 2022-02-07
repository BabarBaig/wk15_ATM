const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
    const choice = ['Deposit', 'Cash Back'];
    console.log(`ATM isDeposit: ${isDeposit}`);
    return (
      <label className="label huge">
        <h3> {choice[Number(!isDeposit)]}</h3>
        <input type="number" width="200" id="number-input" onChange={onChange}></input>
        <input type="submit" width="200" id="submit-input" value="Submit"
            disabled={!isValid}></input>
      </label>
    );
  };
  
  const Account = () => {
    const [deposit,    setDeposit]    = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit,  setIsDeposit]  = React.useState(true);
    const [atmMode,    setAtmMode]    = React.useState("")  // "", "Deposit", "Cash Back"
    const [_Null, _Deposit, _CashBack] = ["", "Deposit", "Cash Back"] // allowed values for "atmMode"
    const [validTransaction, setValidTransaction] = React.useState(false)
  
    let status = `Account Balance $ ${totalState} `;
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  
    const handleChange = (event) => {
      console.log(`handleChange ${event.target.value}`);
      const value = event.target.value
      if (value <= 0)   return
      if ((atmMode == _CashBack) && (value > totalState)){
        console.log(`cashback ${value} cannot be greater than ${totalState}`)
        setValidTransaction(false)
      } else {
        setValidTransaction(true)
      }
      setDeposit(Number(value));
    };

    const handleSubmit = (event) => {
      let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      setTotalState(newTotal);
      setValidTransaction(false);
      event.preventDefault();
    };

    const handleModeSelect = (event) => {
      const value = event.target.value
      setAtmMode(value)
      if (value.localeCompare(_Deposit) == 0) {
        setIsDeposit(true)
      }
      else if (value.localeCompare(_CashBack) == 0){
        setIsDeposit(false)
      }
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <h2 id="total">{status}</h2>
        <label>Select an action below to continue</label>
        <p></p>
        <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
          <option id="no-selection"       value=""></option>
          <option id="deposit-selection"  value="Deposit">Deposit</option>
          <option id="cashback-selection" value="Cash Back">Cash Back</option>
        </select>
        { atmMode &&
          <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}>
          </ATMDeposit>
        }
      </form>
    );
  };

  ReactDOM.render(<Account />, document.getElementById('root'));
  