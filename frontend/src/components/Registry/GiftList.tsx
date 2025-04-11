import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import giftService from '../../services/gift';
import { Context } from '../../types/context';
import { Gift } from '../../types/gift';
import './GiftList.css';

const GiftList = () => {
  const { household, language } = useOutletContext<Context>();

  const [gifts, setGifts] = useState<Gift[]>([]);

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const fetchedGifts = await giftService.fetchAllGifts();
        setGifts(fetchedGifts);
      } catch (error) {
        console.error('Failed to fetch gifts:', error);
      }
    };

    fetchGifts();
  }, []);

  const handleCheckboxChange = async (giftId: number, claim: boolean) => {
    try {
      if (claim) {
        await giftService.claimGift(giftId);
      } else {
        await giftService.unclaimGift(giftId);
      }
      setGifts((prevGifts) =>
        prevGifts.map((gift) =>
          gift.id === giftId
            ? { ...gift, householdId: claim ? household!.id : null }
            : gift
        )
      );
    } catch (error) {
      console.error('Failed to update gift claim:', error);
    }
  };

  const mapLinkToShop = (url: string) => {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.split('.').at(-2);
    switch (domain) {
      case 'amazon':
        return 'Amazon';
      case 'johnlewis':
        return 'John Lewis';
      default:
        return {
          English: 'Manufacturer',
          Hungarian: 'Gyártó',
        }[language];
    }
  };

  return (
    <table className="gift-list">
      <thead>
        <tr>
          <th></th>
          <th>
            {
              {
                English: 'Price',
                Hungarian: 'Ár',
              }[language]
            }
          </th>
          <th>
            {
              {
                English: 'Where to buy',
                Hungarian: 'Megrendelhető',
              }[language]
            }
          </th>
          <th>
            {
              {
                English: 'Reserved',
                Hungarian: 'Lefoglalva',
              }[language]
            }
          </th>
        </tr>
      </thead>
      <tbody>
        {gifts
          .toSorted((a, b) => {
            switch (language) {
              case 'English':
                return a.nameEnglish.localeCompare(b.nameEnglish);
              case 'Hungarian':
                return a.nameHungarian.localeCompare(b.nameHungarian);
              default:
                return 0;
            }
          })
          .toSorted((a, b) => {
            const aClaimedByOther =
              a.householdId !== null && a.householdId !== household?.id;
            const bClaimedByOther =
              b.householdId !== null && b.householdId !== household?.id;

            if (aClaimedByOther && !bClaimedByOther) return 1;
            if (!aClaimedByOther && bClaimedByOther) return -1;
            return 0;
          })
          .map((gift) => {
            const isClaimedByOther =
              gift.householdId !== null && gift.householdId !== household?.id;

            return (
              <tr
                key={gift.id}
                className={isClaimedByOther ? 'claimed-by-other' : ''}
              >
                <td>
                  {
                    {
                      English: gift.nameEnglish,
                      Hungarian: gift.nameHungarian,
                    }[language]
                  }
                </td>
                <td>≈£{gift.price}</td>
                <td>
                  {gift.links.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {mapLinkToShop(link)}
                    </a>
                  ))}
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={!!gift.householdId}
                    disabled={isClaimedByOther}
                    onChange={(e) =>
                      handleCheckboxChange(gift.id, e.target.checked)
                    }
                  />
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default GiftList;
