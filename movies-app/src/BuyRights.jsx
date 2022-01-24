import { transferMovie } from './services/dataProvider';
import { FormControl, TextField, MenuItem } from '@material-ui/core';
import { useState } from 'react';

const BuyRights = (props) => {
    const { movie, availableStudios } = props;
    const [studioSelected, setSelectedStudio] = useState('');

    const movieNameLower = movie.name.toLowerCase();
    const handleChange = (event) => {
        const selectedStudio = availableStudios.find(studio => (studio.id === event.target.value));
        setSelectedStudio(selectedStudio.id);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        transferMovie({
            buyerStudio: studioSelected,
            movieData: { movieName: movie.name, studioId: movie.studioId }
        })
            .then((response) => {
                if (response.status === 200) {
                    alert(response.message)
                    props.onMoviePurchase();
                    setSelectedStudio('');
                }
                else {
                    alert(response.message)
                }
            })
    }

    return (<FormControl>
        <TextField
            id={movieNameLower.replace(' ', '-')}
            select
            label="Tranfer to Studio"
            value={studioSelected}
            onChange={handleChange}
            helperText="Select studio to transfer"
        >
            {availableStudios.map(studio => <MenuItem key={studio.id} value={studio.id}>{studio.name}</MenuItem>)}
        </TextField>
        <input type="submit" value="Submit" onClick={handleSubmit} />
    </FormControl>)
}

export default BuyRights;