import styled from "styled-components";
import { Header } from "./components/headerComponents";
import { AppNameComponent } from "./components/headerComponents";
import { AppIcon } from "./components/headerComponents";
import { SearchComponnent } from "./components/headerComponents";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

import Axios from "axios";

const APP_ID = "c2d20d56";
const APP_KEY = "edc8d3b88ed875313cedd5a78e872a14";

const Container = styled.div`
display: flex;
flex-direction:column;
`;

const RecipeListContainer = styled.div`
display:flex;
flex-direction:row;
flex-wrap: wrap;
padding:30px;
gap: 20px;
justify-content:space-evenly;
`;
const RecipeContainer = styled.div`
display: flex;
flex-direction:column;
padding :15px;
width: 220px;
box-shadow: 0 3px 10px 0 #aaa;
border-radius: 25px;
`;

const CoverImage = styled.img`
height:180px;
border-radius: 25px;
&:hover{
  filter:contrast(1) saturate(1.6);
}
`;

const RecipeName = styled.span`
font-size: 18px;
font-weight: bold;
color:black;
margin:10px 0;
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 200px;
  opacity: 50%;
`;

const IngredientsText = styled.span`
font-size: 18px;
font-weight: bold;
border: solid 1px black;
color:black;
cursor: pointer;
padding: 10px 15px;
border-radius: 25px;
color: black;
text-align: center;
margin-bottom:4px;
&:hover {
    background-color: black ;
    color: white;
  }
`;

const SeeMoreText = styled.span`
font-size: 18px;
font-weight: bold;
border: solid 1px black;
color:black;
cursor: pointer;
padding: 13px 15px;
border-radius: 25px;
color: black;
text-align: center;
margin:10px 0;
&:hover {
    background-color: black ;
    color: white;
  }
`;

const SeeNewTab = styled(SeeMoreText)`
  color: black;
  border: solid 1px black;
`;

const RecipeComponent = (props) => {
  const [show, setShow] = useState("");

  const { label, image, ingredients, url } = props.recipe;
  return (
    <RecipeContainer>
      <Dialog
        onClose={() => console.log("adsadad")}
        aria-labelledby="simple-dialog-title"
        open={!!show}
      >
        <DialogTitle>Ingredients</DialogTitle>
        <DialogContent>
          <RecipeName>{label}</RecipeName>
          <table>
            <thead>
              <th>Ingredient</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index} className="ingredient-list">
                  <td>{ingredient.text}</td>
                  <td>{ingredient.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <SeeNewTab onClick={() => window.open(url)}>See More</SeeNewTab>
          <SeeMoreText onClick={() => setShow("")}>Close</SeeMoreText>
        </DialogActions>
      </Dialog>
      <CoverImage src={image} alt={label} />
      <RecipeName>{label}</RecipeName>
      <IngredientsText onClick={() => setShow(!show)}>
        Ingredients
      </IngredientsText>
      <SeeMoreText onClick={() => window.open(url)}>
        See Complete Recipe
      </SeeMoreText>
    </RecipeContainer>
  );
};

function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [timeoutId, updateTimeoutId] = useState();
  const [recipeList, updateRecipeList] = useState([]);
  const fetchRecipe = async(searchString) => {
   const response = await Axios.get(`https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`,);
  
   updateRecipeList(response.data.hits);
};

  const onTextChange=(event)=>{
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => 
     fetchRecipe(event.target.value), 500);
     updateTimeoutId(timeout);
  }
  return (
    <Container>
      <Header>
        <AppNameComponent>
          <AppIcon src="/harvest.png" />
          RECIPE SEARCH
        </AppNameComponent>
        <SearchComponnent>
          <div className="box">
            <form name="search">
              <input
                type="text"
                className="input"
                name="txt"
                onmouseout="this.value = ''; this.blur();"
                placeholder="Search"
                value={searchQuery}
                onChange={onTextChange}
              />
              <i class="fa-solid fa-magnifying-glass"></i>
            </form>
          </div>
        </SearchComponnent>
      </Header>
      <RecipeListContainer>
        {recipeList?.length ? (
          recipeList.map((recipe, index) => (
            <RecipeComponent key={index} recipe={recipe.recipe} />
          ))
        ) : (
          <Placeholder src="/harvest.png" />
        )}
      </RecipeListContainer>
    </Container>
  );
}

export default App;
