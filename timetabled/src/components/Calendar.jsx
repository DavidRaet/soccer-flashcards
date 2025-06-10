import Event from './Event'

const Calendar = () => {
  return (
    <table>
      <tbody>
          <tr>
          <td className="time"></td>
          <td className="days">Sunday</td>
          <td className="days">Monday</td>
          <td className="days">Tueday</td>
          <td className="days">Wednesday</td>
          <td className="days">Thursday</td>
          <td className="days">Friday</td>
          <td className="days">Saturday</td>
        </tr>   

     <tr>
          <td className="time">8am</td>
          <td></td>
          <Event event='Fancy Breakfast' color='green' />
          <Event event='Fancy Breakfast' color='green' />
          <Event event='Fancy Breakfast' color='green' />
          <Event event='Fancy Breakfast' color='green' />
          <Event event='Fancy Breakfast' color='green' />
        </tr>   
        
      <tr>
          <td className="time">9am</td>
          <Event event='Fancy Breakfast' color='green' />
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <Event event='Fancy Breakfast' color='green' />
        </tr>   

          <tr>
          <td className="time">10am</td>
          <td></td>
          <Event event='Pad Drills' color='blue'></Event>
          <Event event='Strength & Conditioning' color='blue'></Event>
          <Event event='Boxing Training' color='blue'></Event>
          <Event event='Boxing Training' color='blue'></Event>
          <Event event='Boxing Training' color='blue'></Event>
          <td></td>
        </tr> 


          <tr>
          <td className="time">11am</td>
          <td></td>
          <Event event='Sparring' color='blue'></Event>
          <Event event='Boxing Traniing' color='blue'></Event>
          <Event event='Boxing Traniing' color='blue'></Event>
          <Event event='Boxing Traniing' color='blue'></Event>
          <Event event='Boxing Traniing' color='blue'></Event>
          <td></td>
        </tr> 

              <tr>
          <td className="time">12pm</td>
          <td></td>
          <Event event='Bag Work' color='blue'></Event>
          <Event event='Boxing Traniing' color='blue'></Event>
          <Event event='Boxing Traniing' color='blue'></Event>
          <Event event='Boxing Traniing' color='blue'></Event>
          <Event event='Boxing Traniing' color='blue'></Event>
          <td></td>
        </tr> 

          <tr>
          <td className="time">1pm</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr> 

          <tr>
          <td className="time">2pm</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr> 

          <tr>
          <td className="time">3pm</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>

          <tr>
          <td className="time">4pm</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr> 

        <tr>
          <td className="time">5pm</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr> 
        
      </tbody>
    </table>
  )
}

export default Calendar;