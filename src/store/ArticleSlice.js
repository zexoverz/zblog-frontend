import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import axiosInstance from "../lib/AxiosInterface";
import toast from 'react-hot-toast';

const initialState = {
  articles: [],
  filteredArticle: [],
  hero: null,
  status: 'idle',
  error: null
}

export const getArticles = createAsyncThunk("article/getAll", async () => {
  try {
    toast.loading('Preparing Article');
    const {data} = await axiosInstance({
      method: "GET",
      url: `/article/getAll`,
    })

    return data;
  } catch (error) {
    return {articles: [], status: "idle", error };
  }
});

const articleSlice = createSlice({
  name: 'articleSlice',
  initialState,
  reducers: {
    filterArticle: (state, action) => {
        const currentState = current(state)

        console.log(currentState)
        if(action.payload == "All Categories"){
            return {
                ...currentState,
                filteredArticle: currentState.articles
            }
        }else{
            let categoryArticle = currentState.articles.filter(item => {
                return item.categories.includes(action.payload)
            })

            return {
                ...currentState,
                filteredArticle: categoryArticle
            }
        }
        
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getArticles.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.status = 'succeeded'

        if(action.payload.length > 0){
            state.hero = action.payload[action.payload.length-1];
            state.articles = action.payload;
            state.filteredArticle = action.payload;
         
        }
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
})

export default articleSlice.reducer;

export const {filterArticle} = articleSlice.actions;

export const selectArticleById = (state, articleId) =>{
    if(articleId == state.hero.id){
        return state.hero
    }else{
        return state.articles.find(item => item.id == articleId)
    }
}

export const getMyArticle = (state, username) => {
    return state.articles.filter(item => item.user.username == username);
}
