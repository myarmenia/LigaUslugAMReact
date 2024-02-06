import Button from "@mui/material/Button";

export default function CustomButton({children, ...restProps}) {
    return <Button
        style={{textTransform: 'none'}}
        {...restProps}
        sx={{
            background: '#5A7287',
            fontSize: '20px',
            pt: '13px',
            pb: '13px',
            pl: '32px',
            pr: '32px',
            fontWeight: 500,
            lineHeight: '24px',
            color: '#FFF',
            '&:hover': {background: '#5A7287'}
        }}>
        {children}
    </Button>
}