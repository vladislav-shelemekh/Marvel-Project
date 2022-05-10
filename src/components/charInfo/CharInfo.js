import {Component} from 'react'
import Spinner from '../spinner/Spinner'
import ErrorMesage from '../errorMessage/ErrorMesage'
import Skeleton from '../skeleton/Skeleton'
import MarvelService from '../../services/MarvelService'
import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }


    updateChar = () => {
        const {charId} = this.props
        if (!charId) {
            return;
        }

        this.onCharLoading();

        this.marvelService
        .getCharacter(charId)
        .then(this.onCharLoaded)
        .catch(this.onError)

        // this.foo.bar = 0;
    }

    onCharLoaded = (char) => {
        this.setState({
            char, 
            loading: false})
 
    }

    onCharLoading = () => {
        this.setState({
            loading : true
        })
    }

   render() {
    const {char, loading, error} = this.state;   
    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMesage/> : null;
    const spinner = loading ? <Spinner/> : null; 
    const content = !(loading || error || !char) ? <View char={char}/> : null;
        return (
            <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
            </div>
    )}
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    const isHasComics = !!comics.length
    
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

export default CharInfo;