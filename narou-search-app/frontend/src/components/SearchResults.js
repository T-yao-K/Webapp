import React from 'react';
import { List, ListItem, Card, CardContent, Typography, Button } from '@mui/material';

const SearchResults = ({ novels, genres }) => {
  const getLowercaseNcodeUrl = (ncode) => `https://ncode.syosetu.com/${ncode.toLowerCase()}/`;

  return (
    <List>
      {novels.map((novel) => (
        <ListItem key={novel.ncode}>
          <Card style={{ width: '100%', marginBottom: '10px' }}>
            <CardContent>
              <Typography variant="h6">{novel.title}</Typography>
              <Typography variant="body2">作者: {novel.writer}</Typography>
              <Typography variant="body2">ジャンル: {genres[novel.genre] || '不明'}</Typography>
              <Typography variant="body2">ブックマーク数: {novel.fav_novel_cnt}</Typography>
              <Typography variant="body2">評価点: {novel.all_point}</Typography>
              <Button
                href={getLowercaseNcodeUrl(novel.ncode)}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
              >
                読む
              </Button>
            </CardContent>
          </Card>
        </ListItem>
      ))}
    </List>
  );
};

export default SearchResults;