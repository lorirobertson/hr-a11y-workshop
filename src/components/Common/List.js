import React, { useState } from 'react';
import styled from 'styled-components';

const UL = styled.ul`
	list-style: none;
	list-style-type: none;
	margin: 0;
	padding: 0;
`;

const ListItem = styled.li`
	border-bottom: 1px solid #ecf0f1;
	transition: all .2s;
	font-size: 12px;
	color: #7f8c8d;
	display: flex;
	align-items: center;
	min-height: 3.5rem;

	&:last-child {
		border-bottom: none;
	}

	&:hover {
		background: #ecf0f1;
	}
`;

const Main = styled.div`
	flex: 3 auto;
`;

const Prepend = styled.div`
	flex: 1 auto;
	text-align: center;
`;

const Append = styled.div`
	flex: 1 auto;
	text-align: center;
`;

const SearchContainer = styled.div`
	position: relative;
`;

const ClearFilter = styled.button`
	position: absolute;
	right: 0;
	background: transparent;
	border: none;
	padding: .5rem 1rem;
    color: #e74c3c;
`;

const Input = styled.input`
    width: 100%;
    border: none;
    border-bottom: 1px solid #999;
    padding: .5rem;
`;

function safeToString(x) {
	switch (typeof x) {
		case 'object':
			return JSON.stringify(x);

		default:
			return x.toString();
	}
}

const List = ({
	items = [],
	itemTemplate,
	itemPrepend,
	itemAppend,
	useFilter=false,
	filterKey,
	excludeKeys = [],
}) => {
	const [filterValue, setFilterValue] = useState();
	const MainTemplate = itemTemplate;
	const PrependTemplate = itemPrepend;
	const AppendTemplate = itemAppend;

	function complexFilterCondition(item) {
		let containsSearchValue = 0;

		if ( filterValue ) {
			Object.keys(item).forEach( key => {
				if ( excludeKeys.indexOf(key) === -1 ){
					let stringed = safeToString(item[key]);
					let keyValue = stringed.toLowerCase();
					let compare = filterValue.toLowerCase();
	
					if ( keyValue.indexOf(compare) !== -1 ) {
						containsSearchValue++;
					}
				}
			});
			
			return containsSearchValue > 0 ? true : false;
		}

		return true;
	}

	function filterCondition(item) {
		if ( filterValue && filterKey && item.hasOwnProperty(filterKey) ) {
			let key = item[filterKey].toLowerCase() || '';
			let value = filterValue ? filterValue.toLowerCase() : '';
			return value ? key.indexOf(value) !== -1 : true;
		} else if ( filterValue && filterKey && !item.hasOwnProperty(filterKey) ){
			//console.error(`The key "${filterKey}" doesn't exist in your data object.`);
			return false;
		} else {
			return true;
		}
	}
	
	return (
		<>
			{ useFilter ? 
				<SearchContainer>
					<Input
						type="text"
						placeholder="filter..."
						value={filterValue}
						onChange={(e) => setFilterValue(e.target.value)}
					/>
					<ClearFilter
						hidden={!filterValue}
						onClick={() => setFilterValue('')}
						>x
					</ClearFilter>
				</SearchContainer>
			: ''}
			<UL>
				{items.filter(complexFilterCondition).map( (item, i) => 
					<ListItem key={i}>
						{itemPrepend ? 
							<Prepend>
								<PrependTemplate {...item} />
							</Prepend>
						: ''}

						<Main>
							<MainTemplate {...item} />
						</Main>

						{itemAppend ? 
							<Append>
								<AppendTemplate {...item} />
							</Append>
						: ''}
					</ListItem>
				)}
			</UL>
		</>
	);
};

export default List;