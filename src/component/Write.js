import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import logo from './logo_img.png';

function Writer() {
	const params = useParams();
	const toList = window.localStorage.getItem('finallyList');
	var arr;
	if (toList == null) {
		arr = [];
	} else {
		arr = JSON.parse(toList);
	}
	const [finallyList, setfinallList] = useState(arr);
	var newArray;
	var modTitle;
	var modValue;

	if (params[Object.keys(params)[0]] != '') {
		newArray = finallyList.filter(
			(storageItem) => storageItem.key == params[Object.keys(params)[0]]
		);
		modTitle = newArray[0].title;
		modValue = newArray[0].value;
	} else {
		modTitle = '';
		modValue = '';
	}
	let today = new Date();
	let nowToday = today.toLocaleString();
	const [toTime, setToTime] = useState(nowToday);
	const [toBoard, setToDo] = useState(modValue);
	const [toTitle, setToTitle] = useState(modTitle);
	const onChange = (event) => setToDo(event.target.value);
	const onTitleChange = (event) => setToTitle(event.target.value);

	const onSubmit = (event) => {
		event.preventDefault();
		if (toBoard === '') {
			alert('글을 작성해주세요.');
			return;
		}
		if (params[Object.keys(params)[0]] != '') {
			//내가 지금 쓰는 글을 제외한 다른 글들을 newArray에 넣는다.
			var newArray = finallyList.filter(
				(storageItem) =>
					storageItem.key !== Number(params[Object.keys(params)[0]])
			);
			//스토리지에 있는 글을 전부지운다.
			localStorage.removeItem('finallyList');
			//내가 수정하고 있는 글을 Object형식으로 만든다.
			const userInput = {
				value: toBoard,
				key: Number(params[Object.keys(params)[0]]),
				title: toTitle,
				time: toTime,
			};
			//새로운 글을 기존글배열에 넣는다.
			newArray.push(userInput);
			//정렬을 하기위해 변수를만든다.
			var result;
			//key값을 기준으로 내림차순으로 만들어준다.
			result = newArray.sort((a, b) => b.key - a.key);
			//정렬한 배열을 스토리지에 넣는다.
			localStorage.setItem('finallyList', JSON.stringify(result));
			//링크를 이동한다.
			window.location.href = '/view/' + Number(userInput.key);
		} else {
			var lastValue = JSON.parse(window.localStorage.getItem('finallyList'));
			var key = '';
			if (lastValue.length == 0) {
				key = 1;
			} else {
				key = lastValue[0].key + 1;
			}

			const userInput = {
				value: toBoard,
				key: key,
				title: toTitle,
				time: toTime,
			};
			setfinallList((currentArray) => [userInput, ...currentArray]);
			setToDo('');
			window.location.href = '/view/' + Number(userInput.key);
		}
	};
	if (params[Object.keys(params)[0]] == '') {
		localStorage.setItem('finallyList', JSON.stringify(finallyList));
	}

	return (
		<div className="inner">
			<Link to="/" className="logo">
				<img src={logo} className="img_logo" />
				My Board
			</Link>
			<h1>글쓰기</h1>
			<form>
				<h3>제목</h3>
				<input
					className="title_style"
					type="text"
					value={toTitle}
					onChange={onTitleChange}
				></input>
				현재시간: <span>{toTime}</span>
				<h3>내용</h3>
				<textarea
					className="board_style"
					value={toBoard}
					onChange={onChange}
					type="text"
				></textarea>
				<div className="btn_wrap">
					<button onClick={onSubmit}>확인</button>
					<button>
						<Link to={`/`}>목록</Link>
					</button>
				</div>
			</form>
		</div>
	);
}
export default Writer;
