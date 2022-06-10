import styles from './HomeScreen.module.scss';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import CardsList from '../../components/CardsList/CardsList';
import searchIcon from '../../assets/search-icon.png';
import locationIcon from '../../assets/location-icon.png'
import { useLazyQuery } from '@apollo/client';
import { SEARCH_QUERY } from '../../graphql/queries';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators, State } from '../../store'
import { bindActionCreators } from 'redux';
import { Business } from '../../types/Business';

const HomeScreen = () => {
	const dispatch = useDispatch()

	const { saveBusinessList } = bindActionCreators(actionCreators, dispatch)
	const businessList = useSelector((state: State) => state.saveBusinessList.currentSearch);
	const [term, setTerm] = useState<string | undefined>();
	const [location, setLocation] = useState<string | undefined>();

	const [getSearch, { loading, error }] = useLazyQuery(SEARCH_QUERY, {
		variables: {
			term: term,
			location: location,
			limit: 10
		},
		onCompleted: data => {
			const listWithState = data.search.business.map((item: Business) => {
				return {...item };
			})
			saveBusinessList(listWithState);
		}
	});

	const handleClick = () => {
		getSearch();
	};

	const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTerm(e.target.value);
	}

	const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocation(e.target.value);
	}

	if(loading) {
		return <p>Loading...</p>
	}

	if (error) {
		return <p>Error</p>
	}

	return (
		<>
			<div className={styles['main-container']}>
				<div className={styles['inputs-container']}>
					<Input onChange = {handleTermChange} icon={searchIcon} placeholder="Search" roundedRight={false} />
					<Input onChange = {handleLocationChange} icon={locationIcon} placeholder="Location" roundedRight={true} />
				</div>
				<div className={styles['main-container__button']}>
					<Button onClick={handleClick} />
				</div>
				<CardsList businesses={businessList} />
			</div>
		</>
	)
}

export default HomeScreen;
