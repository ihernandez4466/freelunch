export default function Header({ imagePath, customStyle }) {
    return (
      <div style={{ width: '100%', margin: 0, padding: 0 }}>
        <div id="brand" className="brand-section" style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 0,
            padding: 0,
            ...customStyle,
          }}>
            <img src={imagePath} loading="lazy" alt="freelunch header" style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    );
}
