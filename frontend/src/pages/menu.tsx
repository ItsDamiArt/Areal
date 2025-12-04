import { useTranslation } from "react-i18next"

export const Menu = () => {
    const { t } = useTranslation()

    return (
        <div id='Menu-Container'>
            <section className="menu-header">
                <h1>{t('menu.title')}</h1>
                <p>{t('menu.subtitle')}</p>
            </section>

           
            <div className="menu-grid">
                
                
                <div className="menu-column">
                    
                
                    <section className="menu-section">
                        <h2>{t('menu.starters.title')}</h2>
                        
                        <div className="dish">
                            <div className="dish-header">
                                <h3>{t('menu.starters.items.cauliflower.name')}</h3>
                                <span className="price">€14</span>
                            </div>
                            <p className="dish-description">
                                {t('menu.starters.items.cauliflower.description')}
                            </p>
                        </div>

                        <div className="dish">
                            <div className="dish-header">
                                <h3>{t('menu.starters.items.amberjack.name')}</h3>
                                <span className="price">€16</span>
                            </div>
                            <p className="dish-description">
                                {t('menu.starters.items.amberjack.description')}
                            </p>
                        </div>

                        <div className="dish">
                            <div className="dish-header">
                                <h3>{t('menu.starters.items.egg.name')}</h3>
                                <span className="price">€15</span>
                            </div>
                            <p className="dish-description">
                                {t('menu.starters.items.egg.description')}
                            </p>
                        </div>
                    </section>

                    
                    <section className="menu-section">
                        <h2>{t('menu.mainCourses.title')}</h2>
                        
                        <div className="dish">
                            <div className="dish-header">
                                <h3>{t('menu.mainCourses.items.turbot.name')}</h3>
                                <span className="price">€26</span>
                            </div>
                            <p className="dish-description">
                                {t('menu.mainCourses.items.turbot.description')}
                            </p>
                        </div>

                        <div className="dish">
                            <div className="dish-header">
                                <h3>{t('menu.mainCourses.items.duck.name')}</h3>
                                <span className="price">€24</span>
                            </div>
                            <p className="dish-description">
                                {t('menu.mainCourses.items.duck.description')}
                            </p>
                        </div>

                        <div className="dish">
                            <div className="dish-header">
                                <h3>{t('menu.mainCourses.items.celeriac.name')}</h3>
                                <span className="price">€21</span>
                            </div>
                            <p className="dish-description">
                                {t('menu.mainCourses.items.celeriac.description')}
                            </p>
                        </div>
                    </section>
                </div>

               
                <div className="menu-column">
                    
                   
                    <section className="menu-section">
                        <h2>{t('menu.firstCourses.title')}</h2>
                        
                        <div className="dish">
                            <div className="dish-header">
                                <h3>{t('menu.firstCourses.items.risotto.name')}</h3>
                                <span className="price">€18</span>
                            </div>
                            <p className="dish-description">
                                {t('menu.firstCourses.items.risotto.description')}
                            </p>
                        </div>

                        <div className="dish">
                            <div className="dish-header">
                                <h3>{t('menu.firstCourses.items.tortello.name')}</h3>
                                <span className="price">€17</span>
                            </div>
                            <p className="dish-description">
                                {t('menu.firstCourses.items.tortello.description')}
                            </p>
                        </div>

                        <div className="dish">
                            <div className="dish-header">
                                <h3>{t('menu.firstCourses.items.spaghetti.name')}</h3>
                                <span className="price">€16</span>
                            </div>
                            <p className="dish-description">
                                {t('menu.firstCourses.items.spaghetti.description')}
                            </p>
                        </div>
                    </section>

                   
                    <section className="menu-section">
                        <h2>{t('menu.desserts.title')}</h2>
                        
                        <div className="dish">
                            <div className="dish-header">
                                <h3>{t('menu.desserts.items.chocolate.name')}</h3>
                                <span className="price">€8</span>
                            </div>
                        </div>

                        <div className="dish">
                            <div className="dish-header">
                                <h3>{t('menu.desserts.items.pear.name')}</h3>
                                <span className="price">€8</span>
                            </div>
                        </div>

                        <div className="dish">
                            <div className="dish-header">
                                <h3>{t('menu.desserts.items.semifreddo.name')}</h3>
                                <span className="price">€8</span>
                            </div>
                        </div>

                        
                        <div className="dish wine-selection">
                            <div className="dish-header">
                                <h3>{t('menu.wines.title')}</h3>
                                <span className="price">{t('menu.wines.price')}</span>
                            </div>
                            <p className="dish-description">
                                {t('menu.wines.description')}
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}