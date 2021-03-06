const initialState = {
    songTitle: '',
    songSubTitle: '',
    songFile: null,
    genres: {
        genres1: null,
        genres2: null,
        genres3: null,
    },
    mainArtist: '',
    additionalArtists: [],
    albumArt: null,
    releaseDate: null,
    songWriters: [],
    owners: [],
    collaborators: [],
}

export const song = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_SONG':
            return state;
        case 'GET_SONG_PENDING':
            return state;
        case 'GET_SONG_REJECTED':
            return { error: action.payload.data };
        case 'GET_SONG_FULFILLED':
            return action.payload.data;
        case 'UPDATE_SONG_DATA':
            return action.payload;
        case 'RESET_SONG_DATA':
            return initialState;
        default:
            return state;
    }
};
