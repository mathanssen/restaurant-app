// 101303562 | Matheus Hanssen |
// 101260567 | Mohammad Jamshed Qureshi |

export default class Food {
  constructor(
    Id,
    Title,
    Description,
    Image,
    Ratings,
    Price,
    Available,
    Category,
    quantity
  ) {
    this.Id = Id;
    this.Title = Title;
    this.Description = Description;
    this.Image = Image;
    this.Ratings = Ratings;
    this.Price = Price;
    this.Available = Available;
    this.Category = Category;
    this.quantity = quantity;
  }
}
