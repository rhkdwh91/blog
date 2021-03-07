const size = {
    mobile: '600px',
    tablet: '900px',
    laptop: '1200px',
    desktop: '1800px',
}

const theme = {
    mainColor: '#3CAEA3',
    mobile: `(max-width: ${size.mobile})`,
    tablet: `(max-width: ${size.tablet})`,
    laptop: `(max-width: ${size.laptop})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopContentSize: `1600px`,
    defaultCard: `box-shadow: 0 5px 20px rgb(0 0 0 / 5%);
    transition: transform 0.3s, box-shadow 0.3s, opacity 0.3s, background 0.2s, border 0.2s;
    will-change: transform, box-shadow, opacity;
    padding: 40px;
    margin: 10px;
    display:flex;
    align-items: center;
    `,
    flexMenuWrap: `display: flex;
    align-items: center;
    justify-content: center;`,
    flexCardWrap: `display: flex;
    align-items: normal;
    justify-content: center;`
}
  
export default theme