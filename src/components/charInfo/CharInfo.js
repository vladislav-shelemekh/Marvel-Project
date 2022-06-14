import {useState, useEffect} from 'react';
import propTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import useMarvelService from '../../services/MarvelService';
import './charInfo.scss';
// import thor from '../../resources/img/thor.jpeg';

const CharInfo = (props) => {
    const [char, setChar] = useState(null)
   
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])

    // componentDidUpdate(prevProps, prevState) {
    //     if(this.props.charId !== prevProps.charId) {
    //         this.updateChar();
    //     }
    // }


    const updateChar = () => {
        clearError();
        const {charId} = props
        if (!charId) {
            return;
        }

        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);   
    }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null; 
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    const isHasComics = !!comics.length;
    
    const isContain = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'

    return (
        <>
            <div className="char__basics">
                <img 
                src={thumbnail} 
                alt={name}
                style={{ objectFit: isContain ? 'contain' : 'cover' }}
                />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics: {!isHasComics && 'no comics'}</div>
            {isHasComics && (
                <ul className="char__comics-list">
                {comics.slice(0, 5).map((item, i) => {
                    
                    return (
                        <li key={i} className="char__comics-item">
                    {item.name}
                        </li>
                    )
                })}
            </ul>
            )}
        </>
    )
}

CharInfo.propTypes = {
    charId: propTypes.number
}

export default CharInfo;