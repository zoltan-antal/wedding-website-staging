import { useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import cover from '../../assets/images/photos/balaton-cover.jpg';
import promenade from '../../assets/images/photos/balaton-promenade.jpg';
import beach from '../../assets/images/photos/balaton-beach.jpg';
import bob from '../../assets/images/photos/balaton-bob.jpg';
import town from '../../assets/images/photos/balaton-town.jpg';
import './index.css';

const PostWedding = () => {
  const { language, mainRef, navWidth } = useOutletContext<Context>();

  return (
    <main
      ref={mainRef}
      style={{ width: `${navWidth}px` }}
      id="post-wedding-page"
    >
      <h1>
        {
          {
            English: 'Post-wedding wind-down',
            Hungarian: 'Esküvő utáni lazulás',
          }[language]
        }
      </h1>
      <div>
        <div className="section" id="intro">
          <p>
            <strong>
              {
                {
                  English: 'Where are we going?',
                  Hungarian: '',
                }[language]
              }
            </strong>
            <br />
            {
              {
                English:
                  "We're going to Lake Balaton: a popular summer destination for both Hungarians and tourists alike. We're going to base ourselves in the lakeside town of Balatonfüred.",
                Hungarian: '',
              }[language]
            }
            <br />
            {
              {
                English:
                  'We hope that this will give you the chance to experience more of Hungary!',
                Hungarian: '',
              }[language]
            }
          </p>
        </div>
        <div className="section" id="beach">
          <p>
            <strong>
              {
                {
                  English: 'What will we be doing?',
                  Hungarian: '',
                }[language]
              }
            </strong>
            <br />
            {
              {
                English: "We'll spend a lot of time chilling at the lake:",
                Hungarian: '',
              }[language]
            }
            <br />
            {
              {
                English:
                  'picnicking, playing games, swimming & doing other water activities, or just relaxing and chatting!',
                Hungarian: '',
              }[language]
            }
            <br />
            {
              {
                English:
                  "We're also planning to have a campfire cookout or BBQ in the evening.",
                Hungarian: '',
              }[language]
            }
          </p>
        </div>
        <div className="section" id="bob">
          <p>
            {
              {
                English:
                  "Another activity we're hoping to do is going to a mountain rail course, which is great fun!",
                Hungarian: '',
              }[language]
            }
          </p>
        </div>
        <div className="section" id="logistics">
          <p>
            <strong>
              {
                {
                  English: 'How will we get there?',
                  Hungarian: '',
                }[language]
              }
            </strong>
            <br />
            {
              {
                English: "We're going to take the train from Budapest.",
                Hungarian: '',
              }[language]
            }
          </p>
          <p>
            <strong>
              {
                {
                  English: 'When are we going?',
                  Hungarian: '',
                }[language]
              }
            </strong>
            <br />
            {
              {
                English:
                  "We'll plan to leave for Balaton on Monday morning and come back Tuesday afternoon or evening, staying for one night.",
                Hungarian: '',
              }[language]
            }
          </p>
        </div>
        <img src={promenade} id="photo-promenade" />
        <img src={beach} id="photo-beach" />
        <img src={bob} id="photo-bob" />
        <img src={town} id="photo-town" />
        <img src={cover} id="photo-cover" />
      </div>
    </main>
  );
};

export default PostWedding;
