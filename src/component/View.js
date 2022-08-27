import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//글번호를 받기 위해 가져온다.
import { useParams } from 'react-router-dom';
import logo from './logo_img.png';

function View() {
	//글번호를 받아오기 위해 useParams를 사용
	const params = useParams();
	//로컬에서 리스트를 가져온다.
	const toList = window.localStorage.getItem('finallyList');
	//가져온 리스트를 초기화한다. parsedToDos로 세팅한다.
	const [parsedToDos, setParsed] = useState(JSON.parse(toList));
	//가져온 seq와 스토리지에 있는 key와 같은 글을 newArray로 가져온다.
	var newArray = parsedToDos.filter(
		(storageItem) => storageItem.key == params.seq
	);
	//newArray의 첫번째는 내가 가져온 글이다.
	const [toBoard, setToDo] = useState(newArray[0].value);
	const [toTitle, setToTitle] = useState(newArray[0].title);
	const [toTime, setToTime] = useState(newArray[0].time);
	//수정할 글을 가져온다. toBoard에 세팅한다.
	const onChange = (event) => setToDo(event.target.value);
	const onTitleChange = (event) => setToTitle(event.target.value);
	//수정버튼을 누르면 발생하는 이벤트
	const onSubmit = (event) => {
		event.preventDefault();
		if (toBoard === '') {
			alert('글을 작성해주세요.');
			return;
		}
		//내가 지금 쓰는 글을 제외한 다른 글들을 newArray에 넣는다.
		var newArray = parsedToDos.filter(
			(storageItem) => storageItem.key !== Number(params.seq)
		);
		//스토리지에 있는 글을 전부지운다.
		localStorage.removeItem('finallyList');
		//내가 수정하고 있는 글을 Object형식으로 만든다.
		const userInput = {
			value: toBoard,
			key: Number(params.seq),
			title: toTitle,
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
		window.location.href = '/';
	};

	return (
		<div className="inner">
			<Link to="/" className="logo">
				<img src={logo} className="img_logo" />
				My Board
			</Link>
			<form>
				<h3>제목</h3>
				<div className="title_style">{toTitle}</div>
				작성한 시간: <span>{toTime}</span>
				<h3>내용</h3>
				<div className="board_style">{toBoard}</div>
				<div className="btn_wrap">
					<button>
						<Link to={`/write/` + Number(params.seq)}>수정</Link>
					</button>
					<button>
						<Link to={`/`}>목록</Link>
					</button>
				</div>
			</form>
		</div>
	);
}
export default View;
