import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';
import './SearchForm.css';

const SearchForm = ({ onSearch, genres, selectedGenres, setSelectedGenres, order, setOrder }) => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <TextField
        label="キーワード"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="search-field keyword-field"
      />
      <FormControl className="search-field genre-field">
        <InputLabel>ジャンル</InputLabel>
        <Select
          multiple
          value={selectedGenres}
          onChange={(e) => setSelectedGenres(e.target.value)}
          renderValue={(selected) => (
            <div>
              {selected.map((value) => (
                <Chip key={value} label={genres[value]} />
              ))}
            </div>
          )}
        >
          {Object.entries(genres).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="search-field order-field">
        <InputLabel>並び順</InputLabel>
        <Select value={order} onChange={(e) => setOrder(e.target.value)}>
          <MenuItem value="new">新着順</MenuItem>
          <MenuItem value="favnovelcnt">お気に入り数順</MenuItem>
          <MenuItem value="reviewcnt">レビュー数順</MenuItem>
          <MenuItem value="hyoka">評価順</MenuItem>
          <MenuItem value="impressioncnt">感想数順</MenuItem>
          <MenuItem value="hyokacnt">評価数順</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" className="search-field search-button">
        検索
      </Button>
    </form>
  );
};

export default SearchForm;