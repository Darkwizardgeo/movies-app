import { TextField } from '@material-ui/core';

const SearchMovie = (props) => {

    return (<TextField
        id="filter-movies"
        label="Filter Movies by name"
        style={{marginTop: '5%'}}
        variant="outlined"
        value={props.search}
        onChange={props.onSearch}
    />)
}

export default SearchMovie;