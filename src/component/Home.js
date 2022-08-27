import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo_img.png';

function Home() {
	const toList = window.localStorage.getItem('finallyList');
	var arr;
	if (toList == null) {
		arr = [];
	} else {
		arr = JSON.parse(toList);
	}
	const [parsedToDos, setParsed] = useState(arr);
	const onSubmit = (item, e) => {
		e.preventDefault();
		if (!window.confirm('삭제하시겠습니까?')) {
			alert('취소되었습니다.');
		} else {
			var newArray = parsedToDos.filter(
				(storageItem) => storageItem.key !== item.key
			);
			localStorage.removeItem('finallyList');

			if (newArray.length !== 0) {
				localStorage.setItem('finallyList', JSON.stringify(newArray));
			} else {
				localStorage.setItem('finallyList', JSON.stringify([]));
			}
			setParsed(JSON.parse(window.localStorage.getItem('finallyList')));
		}
	};

	const [checkedList, setCheckedLists] = useState([]);

	// 전체 체크 클릭 시 발생하는 함수
	const onCheckedAll = useCallback(
		(checked) => {
			if (checked) {
				const checkedListArray = [];

				parsedToDos.forEach((list) => checkedListArray.push(list));

				setCheckedLists(checkedListArray);
			} else {
				setCheckedLists([]);
			}
		},
		[parsedToDos]
	);

	// 개별 체크 클릭 시 발생하는 함수
	const onCheckedElement = useCallback(
		(checked, list) => {
			if (checked) {
				setCheckedLists([...checkedList, list]);
			} else {
				setCheckedLists(checkedList.filter((el) => el !== list));
			}
		},
		[checkedList]
	);

	const delList = (e) => {
		e.preventDefault();
		var delList = checkedList;
		for (var i in delList) {
			const toList = JSON.parse(window.localStorage.getItem('finallyList'));
			var newArray = toList.filter(
				(storageItem) => storageItem.key !== delList[i].key
			);
			localStorage.removeItem('finallyList');
			if (newArray.length !== 0) {
				localStorage.setItem('finallyList', JSON.stringify(newArray));
			} else {
				localStorage.setItem('finallyList', JSON.stringify([]));
			}
		}
		setCheckedLists([]);
		setParsed(JSON.parse(window.localStorage.getItem('finallyList')));
	};
	const newSeq = (item, e) => {
		var lastValue = JSON.parse(window.localStorage.getItem('finallyList'));
		var key = '';
		if (lastValue.length == 0) {
			key = 0;
		} else {
			key = lastValue[0].key + 1;
		}
	};

	return (
		<div className="inner">
			<Link to="/" className="logo">
				<img src={logo} className="img_logo" />
				My Board
			</Link>
			<h1>목록</h1>
			<ul className="li_style">
				<li>
					<div>
						<input
							type="checkbox"
							onChange={(e) => onCheckedAll(e.target.checked)}
							checked={
								checkedList.length === 0
									? false
									: checkedList.length === parsedToDos.length
									? true
									: false
							}
						></input>
					</div>
					<div>번호</div>
					<div>제목</div>
					<div>작성시간</div>
					<div>기능</div>
				</li>
			</ul>
			<ul className="li_style">
				{parsedToDos.length != 0 ? (
					parsedToDos.map((item, index) => (
						<li key={index}>
							<div>
								<input
									key={item.id}
									type="checkbox"
									onChange={(e) =>
										onCheckedElement(e.target.checked, item)
									}
									checked={checkedList.includes(item) ? true : false}
								/>
							</div>
							<div>{item.key}</div>
							<div>
								<Link to={`view/` + item.key}>
									<div className="title">{item.title}</div>
									<div className="text">
										{item.value.length > 10
											? item.value.substring(0, 10) + ' ...더보기'
											: item.value}
									</div>
								</Link>
							</div>
							<div>{item.time}</div>
							<div>
								<button
									onClick={(e) => {
										onSubmit(item, e);
									}}
								>
									삭제
								</button>
							</div>
						</li>
					))
				) : (
					<li className="empty">
						<div>글이 없습니다.</div>
					</li>
				)}
			</ul>
			<div className="btn_wrap">
				<button onClick={newSeq}>
					<Link to={`write`}>글쓰기</Link>
				</button>
				<button onClick={delList}>삭제</button>
			</div>
		</div>
	);
}
export default Home;
