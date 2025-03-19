import { FunctionComponent } from 'react';
import styles from './SideBar.module.css';

const SideBar:FunctionComponent = () => {
  	return (
    		<div className={styles.sidebar}>
      			<div className={styles.unionParent}>
        				<img className={styles.unionIcon} alt="" src="Union.svg" />
        				<div className={styles.iconsLineParent}>
          					<img className={styles.iconsLine} alt="" src="icons-Line.png" />
          					<img className={styles.iconsLine1} alt="" src="icons-Line.png" />
        				</div>
      			</div>
      			<div className={styles.instanceParent}>
        				<div className={styles.iconsLineGroup}>
          					<img className={styles.iconsLine2} alt="" src="icons-Line.svg" />
          					<div className={styles.dashboardWrapper}>
            						<div className={styles.dashboard}>Home</div>
          					</div>
        				</div>
        				<div className={styles.instanceGroup}>
          					<div className={styles.iconsLineContainer}>
            						<img className={styles.iconsLine2} alt="" src="icons-Line.svg" />
            						<div className={styles.dashboardWrapper}>
              							<div className={styles.dashboard}>History</div>
              							<img className={styles.iconsLine4} alt="" src="icons-Line.svg" />
            						</div>
          					</div>
          					<div className={styles.parent}>
            						<div className={styles.div}>오늘</div>
            						<div className={styles.frameWrapper}>
              							<div className={styles.frameParent}>
                								<div className={styles.wrapper}>
                  									<div className={styles.div1}>최근 계속 피곤한데 이유가 뭘까요?</div>
                    										</div>
                    										<div className={styles.wrapper}>
                      											<div className={styles.div1}>두통이 자주 발생하는데 어떤 원인이 있을까요?</div>
                        												</div>
                        												<div className={styles.wrapper}>
                          													<div className={styles.div1}>몸이 자주 붓는데 문제가 될까요?</div>
                            														</div>
                            														<div className={styles.wrapper}>
                              															<div className={styles.div1}>갑자기 체중이 줄었는데 괜찮은 건가요?</div>
                                																</div>
                                																</div>
                                																</div>
                                																</div>
                                																<div className={styles.parent}>
                                  																	<div className={styles.div}>어제</div>
                                  																	<div className={styles.frameGroup}>
                                    																		<div className={styles.wrapper}>
                                      																			<div className={styles.div1}>갑자기 체중이 줄었는데 괜찮은 건가요?</div>
                                        																				</div>
                                        																				<div className={styles.wrapper}>
                                          																					<div className={styles.div1}>소화가 잘 안 되고 속이 더부룩한데 왜 그럴까요?</div>
                                            																						</div>
                                            																						<div className={styles.wrapper}>
                                              																							<div className={styles.div1}>피부에 붉은 반점이 생겼는데 무슨 증상인가요?</div>
                                                																								</div>
                                                																								<div className={styles.wrapper}>
                                                  																									<div className={styles.div1}>밤에 자다가 다리에 쥐가 나는데 원인이 뭘까요?</div>
                                                    																										</div>
                                                    																										<div className={styles.wrapper}>
                                                      																											<div className={styles.div1}>감기와 독감의 차이가 뭔가요?</div>
                                                        																												</div>
                                                        																												<div className={styles.wrapper}>
                                                          																													<div className={styles.div1}>독감 예방접종을 꼭 맞아야 하나요?</div>
                                                            																														</div>
                                                            																														</div>
                                                            																														</div>
                                                            																														</div>
                                                            																														<div className={styles.instanceParent}>
                                                              																															<div className={styles.iconsLineParent1}>
                                                                																																<img className={styles.iconsLine2} alt="" src="icons-Line.svg" />
                                                                																																<div className={styles.dashboardWrapper}>
                                                                  																																	<div className={styles.dashboard}>Top-5</div>
                                                                  																																	<img className={styles.iconsLine4} alt="" src="icons-Line.svg" />
                                                                																																</div>
                                                              																															</div>
                                                              																															<div className={styles.instanceParent1}>
                                                                																																<div className={styles.instanceParent2}>
                                                                  																																	<div className={styles.wrapper7}>
                                                                    																																		<div className={styles.div12}>1</div>
                                                                  																																	</div>
                                                                  																																	<div className={styles.div13}>고기가 좋아요</div>
                                                                  																																	<div className={styles.up}>
                                                                    																																		<div className={styles.div14}>500</div>
                                                                    																																		<img className={styles.iconsLine7} alt="" src="icons-Line.svg" />
                                                                  																																	</div>
                                                                																																</div>
                                                                																																<div className={styles.instanceParent2}>
                                                                  																																	<div className={styles.wrapper7}>
                                                                    																																		<div className={styles.div12}>2</div>
                                                                  																																	</div>
                                                                  																																	<div className={styles.div13}>정신병 걸릴거 같아요</div>
                                                                  																																	<div className={styles.down}>
                                                                    																																		<div className={styles.div14}>333</div>
                                                                    																																		<img className={styles.iconsLine7} alt="" src="icons-Line.svg" />
                                                                  																																	</div>
                                                                																																</div>
                                                                																																<div className={styles.instanceParent2}>
                                                                  																																	<div className={styles.wrapper7}>
                                                                    																																		<div className={styles.div12}>3</div>
                                                                  																																	</div>
                                                                  																																	<div className={styles.div13}>쉽지 않아요</div>
                                                                  																																	<div className={styles.up}>
                                                                    																																		<div className={styles.div14}>13</div>
                                                                    																																		<img className={styles.iconsLine7} alt="" src="icons-Line.svg" />
                                                                  																																	</div>
                                                                																																</div>
                                                                																																<div className={styles.instanceParent5}>
                                                                  																																	<div className={styles.wrapper7}>
                                                                    																																		<div className={styles.div12}>4</div>
                                                                  																																	</div>
                                                                  																																	<div className={styles.div13}>밥맛이없어요.</div>
                                                                																																</div>
                                                                																																<div className={styles.instanceParent5}>
                                                                  																																	<div className={styles.wrapper7}>
                                                                    																																		<div className={styles.div12}>5</div>
                                                                  																																	</div>
                                                                  																																	<div className={styles.div13}>다리가 아파요</div>
                                                                  																																	<div className={styles.down}>
                                                                    																																		<div className={styles.div14}>6</div>
                                                                    																																		<img className={styles.iconsLine7} alt="" src="icons-Line.svg" />
                                                                  																																	</div>
                                                                																																</div>
                                                              																															</div>
                                                            																														</div>
                                                            																														<div className={styles.instanceParent7}>
                                                              																															<div className={styles.iconsLineParent1}>
                                                                																																<img className={styles.iconsLine2} alt="" src="icons-Line.svg" />
                                                                																																<div className={styles.dashboardWrapper}>
                                                                  																																	<div className={styles.dashboard}>Hot-Keyword</div>
                                                                  																																	<img className={styles.iconsLine4} alt="" src="icons-Line.svg" />
                                                                																																</div>
                                                              																															</div>
                                                              																															<div className={styles.instanceParent8}>
                                                                																																<div className={styles.iconsLineParent3}>
                                                                  																																	<img className={styles.iconsLine4} alt="" src="icons-Line.svg" />
                                                                  																																	<div className={styles.div12}>정신불감증</div>
                                                                																																</div>
                                                                																																<div className={styles.wrapper12}>
                                                                  																																	<div className={styles.div12}>힘듬</div>
                                                                																																</div>
                                                                																																<div className={styles.iconsLineParent3}>
                                                                  																																	<img className={styles.iconsLine4} alt="" src="icons-Line.svg" />
                                                                  																																	<div className={styles.div12}>불안감</div>
                                                                																																</div>
                                                                																																<div className={styles.wrapper12}>
                                                                  																																	<div className={styles.div12}>머리통증</div>
                                                                																																</div>
                                                                																																<div className={styles.iconsLineParent3}>
                                                                  																																	<img className={styles.iconsLine4} alt="" src="icons-Line.svg" />
                                                                  																																	<div className={styles.div12}>기면증</div>
                                                                																																</div>
                                                                																																<div className={styles.wrapper12}>
                                                                  																																	<div className={styles.div12}>다리통증</div>
                                                                																																</div>
                                                                																																<div className={styles.iconsLineParent3}>
                                                                  																																	<img className={styles.iconsLine4} alt="" src="icons-Line.svg" />
                                                                  																																	<div className={styles.div12}>사상하부</div>
                                                                																																</div>
                                                                																																<div className={styles.wrapper12}>
                                                                  																																	<div className={styles.div12}>뇌하수체</div>
                                                                																																</div>
                                                                																																<div className={styles.wrapper12}>
                                                                  																																	<div className={styles.div12}>파킨슨병</div>
                                                                																																</div>
                                                                																																<div className={styles.wrapper12}>
                                                                  																																	<div className={styles.div12}>우울증</div>
                                                                																																</div>
                                                                																																<div className={styles.wrapper12}>
                                                                  																																	<div className={styles.div12}>실내운동</div>
                                                                																																</div>
                                                                																																<div className={styles.iconsLineParent3}>
                                                                  																																	<img className={styles.iconsLine4} alt="" src="icons-Line.svg" />
                                                                  																																	<div className={styles.div12}>불면증</div>
                                                                																																</div>
                                                              																															</div>
                                                            																														</div>
                                                            																														</div>
                                                            																														<div className={styles.profilebox}>
                                                              																															<img className={styles.profilePhotoIcon} alt="" src="profile-photo.svg" />
                                                              																															<div className={styles.user777Parent}>
                                                                																																<div className={styles.user777}>User777</div>
                                                                																																<div className={styles.iconsLineParent8}>
                                                                  																																	<img className={styles.iconsLine4} alt="" src="icons-Line.svg" />
                                                                  																																	<img className={styles.iconsLine4} alt="" src="icons-Line.svg" />
                                                                  																																	<img className={styles.iconsLine4} alt="" src="icons-Line.svg" />
                                                                																																</div>
                                                              																															</div>
                                                              																															<div className={styles.iconsLineWrapper}>
                                                                																																<img className={styles.iconsLine4} alt="" src="icons-Line.svg" />
                                                              																															</div>
                                                            																														</div>
                                                            																														</div>);
                                                          																													};
                                                          																													
                                                          																													export default SideBar;
                                                          																													