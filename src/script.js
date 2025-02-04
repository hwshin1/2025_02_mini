console.clear();

import React, {
  useState,
  useEffect,
  useRef
} from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

import {
  HashRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
  useParams,
  useNavigate,
  useLocation,
  useSearchParams
} from "https://cdn.skypack.dev/react-router-dom@6";

import {
  RecoilRoot,
  atom,
  useRecoilState
} from "https://cdn.skypack.dev/recoil";

const listsAtom = atom({
  key: "app/listsAtom",
  default: [
    {
      no: 3,
      title: "citizen",
      regDate: dateToStr(new Date()),
      userName: "야루"
    },
    {
      no: 2,
      title: "citizen",
      regDate: dateToStr(new Date()),
      userName: "야루"
    },
    {
      no: 1,
      title: "citizen",
      regDate: dateToStr(new Date()),
      contents: "기본",
      userName: "야루"
    }
  ]
});

function useBoardList() {
  const [lists, setLists] = useRecoilState(listsAtom);
  const headerList = useRef(lists.length == 0 ? 0 : lists[0].no);

  const addList = ({ title, contents, userName }) => {
    const no = ++headerList.current;

    const newList = {
      no,
      title: title,
      contents: contents,
      regDate: dateToStr(new Date()),
      userName: userName
    };

    const newLists = [newList, ...lists];
    setLists(newLists);
  };

  const findIndexByNo = (no) => {
    return lists.findIndex((list) => list.no == no);
  };

  const findListByNo = (no) => {
    const index = findIndexByNo(no);

    if (index == -1) return null;

    return lists[index];
  };

  //삭제
  const removeByNo = (no) => {
    const index = findIndexByNo(no);

    if (index == -1) return;

    const newLists = lists.filter((_, _index) => index != _index);
    setLists(newLists);
  };

  //수정
  const modifyByNo = (no, contents) => {
    const index = findIndexByNo(no);
    if (index == -1) return;

    const newLists = lists.map((list, _index) =>
      index == _index ? { ...list, contents } : list
    );
    setLists(newLists);
  };

  return {
    lists,
    addList,
    findListByNo,
    removeByNo,
    modifyByNo
  };
}

function ListPage() {
  const boardList = useBoardList();
  const navigate = useNavigate();
  const headListName = ["번호", "제목", "작성일", "작성자"];

  const handleTitleClick = (index) => {
    const list = boardList.lists[index];
    navigate(`/content/${list.no}`);
  };

  return (
    <div className="flex w-full min-w-0 flex-1 px-4 pb-16 pt-20 dark:bg-gray-800">
      <div className="w-full mx-auto p-6">
        <table className="w-full border-collapse border border-gray-300 shadow-lg">
          <thead className="bg-pink-800 text-white">
            <tr>
              {headListName.map((item, index) => (
                <th key={index} className="py-3 px-6 border border-gray-200">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {boardList.lists.map((list, index) => (
              <tr
                key={list.no}
                className="hover:bg-gray-100 transition duration-200"
              >
                <td className="py-2 px-6 text-center border">{list.no}</td>
                <td
                  className="py-2 px-6 border text-blue-600 cursor-pointer hover:underline"
                  onClick={() => handleTitleClick(index)}
                >
                  {list.title}
                </td>
                <td className="py-2 px-6 text-center border">{list.regDate}</td>
                <td className="py-2 px-6 text-center border">
                  {list.userName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function WritePage() {
  const Location = useLocation();
  const boardList = useBoardList();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.title.value = form.title.value.trim();
    form.contents.value = form.contents.value.trim();
    form.userName.value = form.userName.value.trim();

    if (form.title.value.length == 0) {
      alert("제목을 입력해주세요.");
      form.title.focus();
      return;
    } else if (form.contents.value.length == 0) {
      alert("작성글을 입력해주세요.");
      form.contents.focus();
      return;
    } else if (form.userName.value.length == 0) {
      alert("작성자를 입력해주세요.");
      form.userName.focus();
      return;
    }

    boardList.addList({
      title: form.title.value,
      contents: form.contents.value,
      userName: form.userName.value
    });

    form.title.value = "";
    form.contents.value = "";
    form.userName.value = "";

    navigate("/");
  };

  return (
    <>
      <h4>주소 : {Location.pathname}</h4>
      <h2>글쓰기</h2>
      <hr />
      <form onSubmit={onSubmit}>
        <div className="flex">
          <span>제목</span> &nbsp;
          <input
            className="border-2 border-gray-400"
            name="title"
            type="text"
            placeholder="제목을 입력하세요"
          />
        </div>
        &nbsp;
        <div>
          <span>내용</span> &nbsp;
          <textarea
            className="border-2 border-gray-300"
            name="contents"
            cols="40"
            rows="10"
          ></textarea>
        </div>
        <div>
          <span>작성자</span> &nbsp;
          <input
            className="border-2 border-gray-400"
            name="userName"
            type="text"
            placeholder="야루"
          />
        </div>
        <div className="flex">
          <div className="flex-1"></div>
          <button
            className="px-5 py-1 bg-blue-200 text-blue-600 rounded-full hover:bg-blue-300 transition-colors"
            type="submit"
          >
            저장
          </button>
          &nbsp;
          <button
            className="px-5 py-1 bg-blue-200 text-blue-600 rounded-full hover:bg-blue-300 transition-colors"
            onClick={() => navigate("/")}
          >
            취소
          </button>
        </div>
      </form>
    </>
  );
}

function ContentPage() {
  const Location = useLocation();
  const { no } = useParams();
  const boardList = useBoardList();
  const navigate = useNavigate();

  const list = boardList.findListByNo(Number(no));

  if (!list) {
    return (
      <div>
        <div>게시글을 찾을수 없습니다.</div>
        <div onClick={() => navigate("/")}>
          <i
            class="fa-solid fa-square-caret-left"
            style={{ color: "#B197FC", cursor: "pointer" }}
          >
            뒤로가기
          </i>
        </div>
      </div>
    );
  }

  return (
    <form>
      <div className="flex fixed items-center justify-between space-x-2 bg-gray-700 p-2.5 shadow top-0 w-full">
        <h1 className="flex space-x-2 font-extralight text-white md:black">
          <span className="text-2xl font-semibold">나만의 게시판</span>
          <div className="grid">
            <span className="inline-block text-sm uppercase leading-4 tracking-wider">
              주소 :
            </span>
            <span className="inline-block text-sm">{Location.pathname}</span>
          </div>
        </h1>
        <div className="flex flex-auto space-x-2 justify-between text-sm items-center">
          <p className="text-xl text-gray-100">{list.title}</p>
          <p className="text-gray-100">작성자 : {list.userName}</p>
          <p className="text-gray-100">작성일 : {list.regDate}</p>
          <div className="flex">
            <div clasName="flex-1"></div>
            <button className="m-1 text-white ring-1 ring-white" onClick={() => navigate(`/edit/${list.no}`)}>수정</button>
            <button
              className="m-1 text-white ring-1 ring-white"
              onClick={() =>
                confirm(`${list.no}번을 삭제하시겠습니까?`) &&
                boardList.removeByNo(list.no)
              }
            >
              삭제
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-full min-w-0 flex-1 px-4 pb-16 pt-20 dark:bg-gray-800">
        <div className="block relative rd">
          <p>내용</p>
          <p>{list.contents}</p>
        </div>
        <div className="flex">
          <button onClick={() => navigate("/")}>
            <i
              class="fa-solid fa-square-caret-left"
              style={{ color: "#B197FC", cursor: "pointer" }}
            >
              뒤로가기
            </i>
          </button>
        </div>
      </div>
    </form>
  );
}

function EditPage() {
  const { no } = useParams();
  const boardList = useBoardList();
  const navigate = useNavigate();

  const list = boardList.findListByNo(Number(no));

  if (!list) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newContents = form.contents.value.trim();

    if (!newContents) {
      alert("내용을 입력해주세요.");
      return;
    }

    boardList.modifyByNo(list.no, newContents);
    navigate(`/content/${list.no}`, { replace: true });
  };

  return (
    <>
      <h2>게시글 수정</h2>
      <form onSubmit={onSubmit}>
        <div className="flex">
          <span>제목</span> &nbsp;
          <input
            className="border-2 border-gray-400"
            name="title"
            type="text"
            value={list.title}
            disabled
          />
        </div>
        &nbsp;
        <div>
          <span>내용</span> &nbsp;
          <textarea
            className="border-2 border-gray-300"
            name="contents"
            cols="40"
            rows="10"
            value={list.contents}
          ></textarea>
        </div>
        <div>
          <span>작성자</span> &nbsp;
          <input
            className="border-2 border-gray-400"
            name="userName"
            type="text"
            value={list.userName}
            disabled
          />
        </div>
        <div className="flex">
          <div className="flex-1"></div>
          <button
            className="px-5 py-1 bg-blue-200 text-blue-600 rounded-full hover:bg-blue-300 transition-colors"
            type="submit"
          >
            저장
          </button>
          &nbsp;
          <button
            className="px-5 py-1 bg-blue-200 text-blue-600 rounded-full hover:bg-blue-300 transition-colors"
            onClick={() => navigate(`/content/${list.no}`)}
          >
            취소
          </button>
        </div>
      </form>
    </>
  );
}

function LecturePage() {
  return (
    <Layout>
      <div className="flex flex-col items-center px-2 mt-4 md:px-4 lg:px-10">
        <SearchBar placeholder="제목을 검색해보세요" purpose="lecture" />
        // 검색된 게시물이 없을 경우 보여줄 컴포넌트
        {lectureList?.length === 0 && <EmptyPostAlarm />}
        // 검색된 게시물을 보여주는 컴포넌트
        {lectureList?.length !== 0 && <Table dataList={lectureList} />}
      </div>
    </Layout>
  );
}

function SearchPage() {
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const onChange = (e) => {
    setSearchKeyWord(e.target.value);
  };

  const searchSubmit = (e) => {
    e.preventDefault();

    if (!!searchKeyWord) {
      setSearchParams({
        keyword: searchKeyWord
      });
    } else {
      navigate(`${props.purpose === "lecture" ? "/lecture" : "/qa"}`);
    }
  };

  return (
    <form
      className="relative flex h-10 w-full flex-auto items-center justify-end rounded ring-1 ring-black/10"
      onSubmit={searchSubmit}
    >
      <input
        type="text"
        className="h-10 w-full min-w-0 rounded pl-7 outline-none pr-2"
        placeholder="검색어를 입력해주세요."
      />
      <button type="submit" className="absolute right-3 md:text-lg">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
}

function HeadPage() {
  const Location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <header className="flex-col">
        <div className="flex items-center justify-between bg-gray-600 p-2.5 shadow space-x-2 fixed top-0 z-10 w-full">
          <h1 className="flex space-x-2 font-extralight text-white md:black">
            <span className="text-2xl font-semibold">나만의 게시판</span>
            <div className="grid">
              <span className="inline-block text-sm uppercase leading-4 tracking-wider">
                주소 :
              </span>
              <span className="inline-block text-sm">{Location.pathname}</span>
            </div>
          </h1>
          <div className="flex flex-auto space-x-0">
            <SearchPage />
          </div>
          <div className="block pl-1">
            <div className="flex w-full items-center">
              <button
                className="inline-flex items-center px-4 py-2 bg-pink-800 text-white rounded-lg hover:bg-pink-700 transition-colors"
                onClick={(e) => {
                  navigate("/write");
                }}
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                글쓰기
              </button>
            </div>
          </div>
        </div>
      </header>
      <ListPage />
    </>
  );
}

const App = () => {
  const Location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<HeadPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/content/:no" element={<ContentPage />} />
        <Route path="/edit/:no" element={<EditPage />} />
      </Routes>
    </>
  );
};

function Root() {
  return (
    <RecoilRoot>
      <Router>
        <App />
      </Router>
    </RecoilRoot>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));

function dateToStr(d) {
  const pad = (n) => {
    return n < 10 ? "0" + n : n;
  };

  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    " " +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes()) +
    ":" +
    pad(d.getSeconds())
  );
}
