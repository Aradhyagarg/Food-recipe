import styled from "styled-components";
export const Header = styled.div`
color:white;
background-color:#252424;
display: flex;
align-items:center;
flex-direction: row;
justify-content:space-between;
padding:18px;
font-size:25px;
font-weight:bold;
box-shadow:0 3.5px 6px 0 #555; 
`;

export const AppNameComponent = styled.div`
display:flex;
align-items:center;
`;

export const AppIcon = styled.img`
width:36px;
height:36px;
margin:15px;
`;

export const SearchComponnent = styled.div`
.fa-solid fa-magnifying-glass{
  position: relative;
  left:7px;
  bottom:-2px;
  
}
.box{
  position: relative;
}

.input {
  padding: 10px;
  width: 160px;
  height: 60px;
  background: none;
  border: 4px solid white;
  border-radius: 50px;
  box-sizing: border-box;
  font-family: Comic Sans MS;
  font-size: 26px;
  color: white;
  outline: none;
  transition: .5s;
}
.box:hover input{
  width: 350px;
  background: #2E2D2D;
  border-radius: 10px;
}
.box i{
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translate(-50%,-50%);
  font-size: 26px;
  color: white;
  transition: .2s;
}
.box:hover i{
  opacity: 0;
  z-index: -1;
}
`;