import React , { useState } from 'react';
import { List, ListItem, Card, CardContent, Typography, Button, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const SearchResults = ({ novels, genres }) => {
  const [expandedStories, setExpandedStories] = useState({});

  const getLowercaseNcodeUrl = (ncode) => `https://ncode.syosetu.com/${ncode.toLowerCase()}/`;

  const toggleStory = (ncode) => {
    setExpandedStories(prev => ({ ...prev, [ncode]: !prev[ncode] }));
  };

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

              <Typography variant="body2" style={{ marginTop: '10px', marginBottom: '5px' }}>
                あらすじ:
                <Button
                  onClick={() => toggleStory(novel.ncode)}
                  endIcon={expandedStories[novel.ncode] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                >
                  {expandedStories[novel.ncode] ? '折りたたむ' : '展開する'}
                </Button>
              </Typography>

              <Collapse in={expandedStories[novel.ncode]}>
                <Typography variant="body2" style={{ marginBottom: '10px' }}>
                  {novel.story}
                </Typography>
              </Collapse>

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