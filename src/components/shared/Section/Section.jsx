function Section({ children, title, name }) {
  return (
    <section className={`section ${name}`}>
      <h1 className={`section__title ${name}__title`}>
        <span className='section__slash'>/</span>
        {title}
      </h1>
      {children}
    </section>
  )
}

export default Section
