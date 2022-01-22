const movieAppStyles = {
    gridContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    movieGrid: {
        xs: 12,
        sm: 6,
        lg: 4,
    },
    movieCard: {
        border: '1px solid gray',
        borderRadius: '4px',
        margin: '2px',
        padding: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    movieAvatar: { margin: 5, width: 280, height: 280 },
    '@media (max-width: 601px)': {
        movieCard: {
            border: '1px solid gray',
            borderRadius: '4px',
            margin: '2px',
            padding: '5px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'left',
        },
        movieAvatar: { margin: 5, width: 60, height: 60 },
    },
    movieNameStyle: { display: 'inline-block' },
    positionStyle: { fontWeight: 'bold', display: 'inline-block' },
}

export default movieAppStyles;