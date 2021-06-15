import './styles.css';

export const TextInput = ({value, onChange}) => {
    return (
        <div className="container-search">
          <label htmlFor="input">Search</label>
          <input 
            id="input" 
            type="search" 
            onChange={onChange} 
            value={value}
          />
        </div>
    )
}