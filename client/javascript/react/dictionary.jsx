'use strict';

function SearchResults(props) {
  if (props.search.length < 2)
    return '';
  if (!props.results.length)
    return <p>Pas de résultat</p>;

  const listItems = props.results.map((result) =>
    <li key={result.toString()}>
      <a href={'http://1mot.net/' + result.toLowerCase()} title="Cliquer pour voir la définition" target="search"> {result} </a>
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

class DictionaryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      results: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({search: event.target.value.toUpperCase()});
    if (event.target.value.length < 2) {
      return;
    }
    this.setState({
      results: Dictionary.instance.findLongestWords(event.target.value.toUpperCase())
    });
  }

  render() {
    return (
      <form>
        <label>
          <span>Dictionnaire</span>
          <input type="text" value={this.state.search} onChange={this.handleChange} />
        </label>
        <SearchResults results={this.state.results} search={this.state.search}/>
      </form>
    );
  }
}

let domContainer = document.querySelector('#dictionary');
ReactDOM.render(<DictionaryComponent />, domContainer)
