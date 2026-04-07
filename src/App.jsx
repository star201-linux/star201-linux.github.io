import { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  AlertTitle,
  Stack,
  Paper,
  Link
} from '@mui/material';
import {
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { isInBlacklist } from './data/blacklist';

function App() {
  const [qqInput, setQqInput] = useState('');
  const [result, setResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!qqInput.trim()) {
      setResult(null);
      setHasSearched(false);
      return;
    }

    const found = isInBlacklist(qqInput.trim());
    setResult(found);
    setHasSearched(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="sm" sx={{ py: 8, flex: 1 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          align="center" 
          gutterBottom 
          color="primary"
          sx={{ mb: 6 }}
        >
          MTR 黑名单查询器
        </Typography>

        <Card elevation={3}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
              输入 QQ 号
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <TextField
                fullWidth
                placeholder="请输入 QQ 号"
                value={qqInput}
                onChange={(e) => setQqInput(e.target.value)}
                onKeyPress={handleKeyPress}
                variant="outlined"
              />
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                sx={{ minWidth: 100 }}
              >
                查询
              </Button>
            </Stack>

            {hasSearched && result && (
              <Alert severity="error" sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CancelIcon sx={{ fontSize: 32 }} />
                  <Box>
                    <AlertTitle>该用户在黑名单中</AlertTitle>
                    <Typography variant="body2">昵称: {result.name}</Typography>
                    <Typography variant="body2">QQ: {result.qq}</Typography>
                    <Typography variant="body2">原因: {result.reason}</Typography>
                  </Box>
                </Box>
              </Alert>
            )}

            {hasSearched && !result && (
              <Alert severity="success" sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CheckCircleIcon sx={{ fontSize: 32 }} />
                  <Box>
                    <AlertTitle>该用户不在黑名单中</AlertTitle>
                    <Typography variant="body2">QQ: {qqInput}</Typography>
                    <Typography variant="body2">状态: 正常</Typography>
                  </Box>
                </Box>
              </Alert>
            )}
          </CardContent>
        </Card>
      </Container>

      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          backgroundColor: 'grey.100', 
          mt: 'auto',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary">
            如果想申请提交新的黑名单人物请给网站
            <Link 
              href="https://github.com/leonmmcoset/mtrblacklist" 
              target="_blank" 
              rel="noopener noreferrer"
              sx={{ mx: 0.5 }}
            >
              GitHub 仓库
            </Link>
            提交 PR，
            <Link 
              href="https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request" 
              target="_blank" 
              rel="noopener noreferrer"
              sx={{ mx: 0.5 }}
            >
              提交 PR 教程
            </Link>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
