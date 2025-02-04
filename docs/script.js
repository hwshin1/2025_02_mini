console.clear();

import React, {
useState,
useEffect,
useRef } from
"https://cdn.skypack.dev/react";
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
useSearchParams } from
"https://cdn.skypack.dev/react-router-dom@6";

import {
RecoilRoot,
atom,
useRecoilState } from
"https://cdn.skypack.dev/recoil";

const listsAtom = atom({
  key: "app/listsAtom",
  default: [
  {
    no: 3,
    title: "citizen",
    regDate: dateToStr(new Date()),
    userName: "야루" },

  {
    no: 2,
    title: "citizen",
    regDate: dateToStr(new Date()),
    userName: "야루" },

  {
    no: 1,
    title: "citizen",
    regDate: dateToStr(new Date()),
    contents: "기본",
    userName: "야루" }] });




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
      userName: userName };


    const newLists = [newList, ...lists];
    setLists(newLists);
  };

  const findIndexByNo = no => {
    return lists.findIndex(list => list.no == no);
  };

  const findListByNo = no => {
    const index = findIndexByNo(no);

    if (index == -1) return null;

    return lists[index];
  };

  //삭제
  const removeByNo = no => {
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
    index == _index ? { ...list, contents } : list);

    setLists(newLists);
  };

  return {
    lists,
    addList,
    findListByNo,
    removeByNo,
    modifyByNo };

}

function ListPage() {
  const boardList = useBoardList();
  const navigate = useNavigate();
  const headListName = ["번호", "제목", "작성일", "작성자"];

  const handleTitleClick = index => {
    const list = boardList.lists[index];
    navigate(`/content/${list.no}`);
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "flex w-full min-w-0 flex-1 px-4 pb-16 pt-20 dark:bg-gray-800" }, /*#__PURE__*/
    React.createElement("div", { className: "w-full mx-auto p-6" }, /*#__PURE__*/
    React.createElement("table", { className: "w-full border-collapse border border-gray-300 shadow-lg" }, /*#__PURE__*/
    React.createElement("thead", { className: "bg-pink-800 text-white" }, /*#__PURE__*/
    React.createElement("tr", null,
    headListName.map((item, index) => /*#__PURE__*/
    React.createElement("th", { key: index, className: "py-3 px-6 border border-gray-200" },
    item)))), /*#__PURE__*/




    React.createElement("tbody", null,
    boardList.lists.map((list, index) => /*#__PURE__*/
    React.createElement("tr", {
      key: list.no,
      className: "hover:bg-gray-100 transition duration-200" }, /*#__PURE__*/

    React.createElement("td", { className: "py-2 px-6 text-center border" }, list.no), /*#__PURE__*/
    React.createElement("td", {
      className: "py-2 px-6 border text-blue-600 cursor-pointer hover:underline",
      onClick: () => handleTitleClick(index) },

    list.title), /*#__PURE__*/

    React.createElement("td", { className: "py-2 px-6 text-center border" }, list.regDate), /*#__PURE__*/
    React.createElement("td", { className: "py-2 px-6 text-center border" },
    list.userName))))))));








}

function WritePage() {
  const Location = useLocation();
  const boardList = useBoardList();
  const navigate = useNavigate();

  const onSubmit = e => {
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
      userName: form.userName.value });


    form.title.value = "";
    form.contents.value = "";
    form.userName.value = "";

    navigate("/");
  };

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("h4", null, "\uC8FC\uC18C : ", Location.pathname), /*#__PURE__*/
    React.createElement("h2", null, "\uAE00\uC4F0\uAE30"), /*#__PURE__*/
    React.createElement("hr", null), /*#__PURE__*/
    React.createElement("form", { onSubmit: onSubmit }, /*#__PURE__*/
    React.createElement("div", { className: "flex" }, /*#__PURE__*/
    React.createElement("span", null, "\uC81C\uBAA9"), " \xA0", /*#__PURE__*/
    React.createElement("input", {
      className: "border-2 border-gray-400",
      name: "title",
      type: "text",
      placeholder: "\uC81C\uBAA9\uC744 \uC785\uB825\uD558\uC138\uC694" })), "\xA0", /*#__PURE__*/



    React.createElement("div", null, /*#__PURE__*/
    React.createElement("span", null, "\uB0B4\uC6A9"), " \xA0", /*#__PURE__*/
    React.createElement("textarea", {
      className: "border-2 border-gray-300",
      name: "contents",
      cols: "40",
      rows: "10" })), /*#__PURE__*/


    React.createElement("div", null, /*#__PURE__*/
    React.createElement("span", null, "\uC791\uC131\uC790"), " \xA0", /*#__PURE__*/
    React.createElement("input", {
      className: "border-2 border-gray-400",
      name: "userName",
      type: "text",
      placeholder: "\uC57C\uB8E8" })), /*#__PURE__*/


    React.createElement("div", { className: "flex" }, /*#__PURE__*/
    React.createElement("div", { className: "flex-1" }), /*#__PURE__*/
    React.createElement("button", {
      className: "px-5 py-1 bg-blue-200 text-blue-600 rounded-full hover:bg-blue-300 transition-colors",
      type: "submit" }, "\uC800\uC7A5"), "\xA0", /*#__PURE__*/




    React.createElement("button", {
      className: "px-5 py-1 bg-blue-200 text-blue-600 rounded-full hover:bg-blue-300 transition-colors",
      onClick: () => navigate("/") }, "\uCDE8\uC18C")))));







}

function ContentPage() {
  const Location = useLocation();
  const { no } = useParams();
  const boardList = useBoardList();
  const navigate = useNavigate();

  const list = boardList.findListByNo(Number(no));

  if (!list) {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", null, "\uAC8C\uC2DC\uAE00\uC744 \uCC3E\uC744\uC218 \uC5C6\uC2B5\uB2C8\uB2E4."), /*#__PURE__*/
      React.createElement("div", { onClick: () => navigate("/") }, /*#__PURE__*/
      React.createElement("i", {
        class: "fa-solid fa-square-caret-left",
        style: { color: "#B197FC", cursor: "pointer" } }, "\uB4A4\uB85C\uAC00\uAE30"))));






  }

  return /*#__PURE__*/(
    React.createElement("form", null, /*#__PURE__*/
    React.createElement("div", { className: "flex fixed items-center justify-between space-x-2 bg-gray-700 p-2.5 shadow top-0 w-full" }, /*#__PURE__*/
    React.createElement("h1", { className: "flex space-x-2 font-extralight text-white md:black" }, /*#__PURE__*/
    React.createElement("span", { className: "text-2xl font-semibold" }, "\uB098\uB9CC\uC758 \uAC8C\uC2DC\uD310"), /*#__PURE__*/
    React.createElement("div", { className: "grid" }, /*#__PURE__*/
    React.createElement("span", { className: "inline-block text-sm uppercase leading-4 tracking-wider" }, "\uC8FC\uC18C :"), /*#__PURE__*/


    React.createElement("span", { className: "inline-block text-sm" }, Location.pathname))), /*#__PURE__*/


    React.createElement("div", { className: "flex flex-auto space-x-2 justify-between text-sm items-center" }, /*#__PURE__*/
    React.createElement("p", { className: "text-xl text-gray-100" }, list.title), /*#__PURE__*/
    React.createElement("p", { className: "text-gray-100" }, "\uC791\uC131\uC790 : ", list.userName), /*#__PURE__*/
    React.createElement("p", { className: "text-gray-100" }, "\uC791\uC131\uC77C : ", list.regDate), /*#__PURE__*/
    React.createElement("div", { className: "flex" }, /*#__PURE__*/
    React.createElement("div", { clasName: "flex-1" }), /*#__PURE__*/
    React.createElement("button", { className: "m-1 text-white ring-1 ring-white", onClick: () => navigate(`/edit/${list.no}`) }, "\uC218\uC815"), /*#__PURE__*/
    React.createElement("button", {
      className: "m-1 text-white ring-1 ring-white",
      onClick: () =>
      confirm(`${list.no}번을 삭제하시겠습니까?`) &&
      boardList.removeByNo(list.no) }, "\uC0AD\uC81C")))), /*#__PURE__*/







    React.createElement("div", { className: "flex w-full min-w-0 flex-1 px-4 pb-16 pt-20 dark:bg-gray-800" }, /*#__PURE__*/
    React.createElement("div", { className: "block relative rd" }, /*#__PURE__*/
    React.createElement("p", null, "\uB0B4\uC6A9"), /*#__PURE__*/
    React.createElement("p", null, list.contents)), /*#__PURE__*/

    React.createElement("div", { className: "flex" }, /*#__PURE__*/
    React.createElement("button", { onClick: () => navigate("/") }, /*#__PURE__*/
    React.createElement("i", {
      class: "fa-solid fa-square-caret-left",
      style: { color: "#B197FC", cursor: "pointer" } }, "\uB4A4\uB85C\uAC00\uAE30"))))));








}

function EditPage() {
  const { no } = useParams();
  const boardList = useBoardList();
  const navigate = useNavigate();

  const list = boardList.findListByNo(Number(no));

  if (!list) {
    return /*#__PURE__*/React.createElement("div", null, "\uAC8C\uC2DC\uAE00\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
  }

  const onSubmit = e => {
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

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("h2", null, "\uAC8C\uC2DC\uAE00 \uC218\uC815"), /*#__PURE__*/
    React.createElement("form", { onSubmit: onSubmit }, /*#__PURE__*/
    React.createElement("div", { className: "flex" }, /*#__PURE__*/
    React.createElement("span", null, "\uC81C\uBAA9"), " \xA0", /*#__PURE__*/
    React.createElement("input", {
      className: "border-2 border-gray-400",
      name: "title",
      type: "text",
      value: list.title,
      disabled: true })), "\xA0", /*#__PURE__*/



    React.createElement("div", null, /*#__PURE__*/
    React.createElement("span", null, "\uB0B4\uC6A9"), " \xA0", /*#__PURE__*/
    React.createElement("textarea", {
      className: "border-2 border-gray-300",
      name: "contents",
      cols: "40",
      rows: "10",
      value: list.contents })), /*#__PURE__*/


    React.createElement("div", null, /*#__PURE__*/
    React.createElement("span", null, "\uC791\uC131\uC790"), " \xA0", /*#__PURE__*/
    React.createElement("input", {
      className: "border-2 border-gray-400",
      name: "userName",
      type: "text",
      value: list.userName,
      disabled: true })), /*#__PURE__*/


    React.createElement("div", { className: "flex" }, /*#__PURE__*/
    React.createElement("div", { className: "flex-1" }), /*#__PURE__*/
    React.createElement("button", {
      className: "px-5 py-1 bg-blue-200 text-blue-600 rounded-full hover:bg-blue-300 transition-colors",
      type: "submit" }, "\uC800\uC7A5"), "\xA0", /*#__PURE__*/




    React.createElement("button", {
      className: "px-5 py-1 bg-blue-200 text-blue-600 rounded-full hover:bg-blue-300 transition-colors",
      onClick: () => navigate(`/content/${list.no}`) }, "\uCDE8\uC18C")))));







}

function LecturePage() {var _lectureList, _lectureList2;
  return /*#__PURE__*/(
    React.createElement(Layout, null, /*#__PURE__*/
    React.createElement("div", { className: "flex flex-col items-center px-2 mt-4 md:px-4 lg:px-10" }, /*#__PURE__*/
    React.createElement(SearchBar, { placeholder: "\uC81C\uBAA9\uC744 \uAC80\uC0C9\uD574\uBCF4\uC138\uC694", purpose: "lecture" }), "// \uAC80\uC0C9\uB41C \uAC8C\uC2DC\uBB3C\uC774 \uC5C6\uC744 \uACBD\uC6B0 \uBCF4\uC5EC\uC904 \uCEF4\uD3EC\uB10C\uD2B8",

    ((_lectureList = lectureList) === null || _lectureList === void 0 ? void 0 : _lectureList.length) === 0 && /*#__PURE__*/React.createElement(EmptyPostAlarm, null), "// \uAC80\uC0C9\uB41C \uAC8C\uC2DC\uBB3C\uC744 \uBCF4\uC5EC\uC8FC\uB294 \uCEF4\uD3EC\uB10C\uD2B8",

    ((_lectureList2 = lectureList) === null || _lectureList2 === void 0 ? void 0 : _lectureList2.length) !== 0 && /*#__PURE__*/React.createElement(Table, { dataList: lectureList }))));



}

function SearchPage() {
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const onChange = e => {
    setSearchKeyWord(e.target.value);
  };

  const searchSubmit = e => {
    e.preventDefault();

    if (!!searchKeyWord) {
      setSearchParams({
        keyword: searchKeyWord });

    } else {
      navigate(`${props.purpose === "lecture" ? "/lecture" : "/qa"}`);
    }
  };

  return /*#__PURE__*/(
    React.createElement("form", {
      className: "relative flex h-10 w-full flex-auto items-center justify-end rounded ring-1 ring-black/10",
      onSubmit: searchSubmit }, /*#__PURE__*/

    React.createElement("input", {
      type: "text",
      className: "h-10 w-full min-w-0 rounded pl-7 outline-none pr-2",
      placeholder: "\uAC80\uC0C9\uC5B4\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694." }), /*#__PURE__*/

    React.createElement("button", { type: "submit", className: "absolute right-3 md:text-lg" }, /*#__PURE__*/
    React.createElement("i", { class: "fa-solid fa-magnifying-glass" }))));



}

function HeadPage() {
  const Location = useLocation();
  const navigate = useNavigate();

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("header", { className: "flex-col" }, /*#__PURE__*/
    React.createElement("div", { className: "flex items-center justify-between bg-gray-600 p-2.5 shadow space-x-2 fixed top-0 z-10 w-full" }, /*#__PURE__*/
    React.createElement("h1", { className: "flex space-x-2 font-extralight text-white md:black" }, /*#__PURE__*/
    React.createElement("span", { className: "text-2xl font-semibold" }, "\uB098\uB9CC\uC758 \uAC8C\uC2DC\uD310"), /*#__PURE__*/
    React.createElement("div", { className: "grid" }, /*#__PURE__*/
    React.createElement("span", { className: "inline-block text-sm uppercase leading-4 tracking-wider" }, "\uC8FC\uC18C :"), /*#__PURE__*/


    React.createElement("span", { className: "inline-block text-sm" }, Location.pathname))), /*#__PURE__*/


    React.createElement("div", { className: "flex flex-auto space-x-0" }, /*#__PURE__*/
    React.createElement(SearchPage, null)), /*#__PURE__*/

    React.createElement("div", { className: "block pl-1" }, /*#__PURE__*/
    React.createElement("div", { className: "flex w-full items-center" }, /*#__PURE__*/
    React.createElement("button", {
      className: "inline-flex items-center px-4 py-2 bg-pink-800 text-white rounded-lg hover:bg-pink-700 transition-colors",
      onClick: e => {
        navigate("/write");
      } }, /*#__PURE__*/

    React.createElement("svg", {
      class: "w-4 h-4 mr-2",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24" }, /*#__PURE__*/

    React.createElement("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12 4v16m8-8H4" })), "\uAE00\uC4F0\uAE30"))))), /*#__PURE__*/








    React.createElement(ListPage, null)));


}

const App = () => {
  const Location = useLocation();

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement(Routes, null, /*#__PURE__*/
    React.createElement(Route, { path: "/", element: /*#__PURE__*/React.createElement(HeadPage, null) }), /*#__PURE__*/
    React.createElement(Route, { path: "/write", element: /*#__PURE__*/React.createElement(WritePage, null) }), /*#__PURE__*/
    React.createElement(Route, { path: "/content/:no", element: /*#__PURE__*/React.createElement(ContentPage, null) }), /*#__PURE__*/
    React.createElement(Route, { path: "/edit/:no", element: /*#__PURE__*/React.createElement(EditPage, null) }))));



};

function Root() {
  return /*#__PURE__*/(
    React.createElement(RecoilRoot, null, /*#__PURE__*/
    React.createElement(Router, null, /*#__PURE__*/
    React.createElement(App, null))));



}

ReactDOM.render( /*#__PURE__*/React.createElement(Root, null), document.getElementById("root"));

function dateToStr(d) {
  const pad = n => {
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
    pad(d.getSeconds()));

}